import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import "@/app/globals.css";
import { post_core } from "@/lib/misc_requests";
import { DatePicker } from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

export function GeniusQueryTokenClaim() {
  const router = useRouter();

  const [jobId, setJobId] = useState(1);
  const [jobIdIsHovered, setJobIdIsHovered] = useState(false);

  let [exp, setExp] = React.useState(() => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return parseAbsoluteToLocal(date.toISOString());
  });
  const [datePickerErrorMessage, setDatePickerErrorMessage] = useState("");

  function checkDate(date) {
    const parsedDate = date.toDate();
    const now = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(now.getFullYear() + 1);

    if (parsedDate < now || parsedDate > oneYearFromNow) {
      console.log("wrong date");
      setDatePickerErrorMessage(
        "Please enter a date up to one year from today."
      );
    } else {
      setExp(date);
      setDatePickerErrorMessage("");
    }
  }

  const [qr, setQr] = useState(false);
  const [qrIsHovered, setQrIsHovered] = useState(false);

  async function fetch_gq_token() {
    try {
      const path = `/resource?job_id=${jobId}&exp=${exp.toAbsoluteString()}&qr=${
        qr ? 1 : 0
      }`;
      return post_core(path, router)
        .then((data) => {
          return data.query_token;
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log("Fetching failed: " + error);
    }
  }

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSucess] = useState(null);
  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await fetch_gq_token();
      console.log("token", token);
      if (token) {
        navigator.clipboard.writeText(token);
        setSucess(true);
      } else {
        setSucess(false);
      }

      setIsLoading(false);
      setTimeout(() => {
        setSucess(null);
      }, 5000);
    } catch (error) {
      console.error(error);
      setSucess(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="text-sm w-full flex flex-col items-center justify-start border border-gray-700 rounded-lg mt-2 mb-6">
      <div className="w-full flex flex-row items-center justify-start c1 border-b border-gray-700 px-4 py-2">
        <h1 className="font-semibold">Genius-Query token request</h1>
      </div>
      <div className="w-full flex flex-row items-center justify-start px-4 py-2">
        <p className="c1">
          Genius-Queries are similar to request tokens but offer additional
          flexibility. Unlike request tokens, which are automatically generated
          when a user applies via Quicklink and are only valid for a short
          amount of time, a Genius-Query can be tailored with a custom
          expiration date and is capable of accessing specific resources (such
          as a job, account, or application) rather than just jobs.
        </p>
      </div>
      <div className="h-4" />
      <div className="w-full flex flex-row items-center justify-between px-4 py-2">
        <div className="w-3/4 flex flex-col items-start justify-start gap-1">
          <p className="font-medium c1">Job ID</p>
          <input
            className="c0 h-8 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg"
            type="number"
            name="jobId"
            value={jobId}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (newValue >= 0) {
                setJobId(newValue);
              }
            }}
            onMouseEnter={() => setJobIdIsHovered(true)}
            onMouseLeave={() => setJobIdIsHovered(false)}
          />{" "}
          <p className="mx-1 font-medium text-xs text-embloy-purple-light hover:text-embloy-purple-lighter">
            <a
              href="https://developers.embloy.com/docs/core/tokens/token_info#genius-query-token"
              target="_blank"
              rel="noopener noreferrer"
            >
              What&apos;s this token for?
            </a>
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-1 mb-2">
          <p className="w-full font-medium c1">
            QR applications allowed?
            <input
              className="c0 h-4 md:w-10 border-[2px] border-gray-700 outline-none select-all rounded-lg"
              type="checkbox"
              name="jobId"
              value={jobId}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                if (newValue >= 0) {
                  setJobId(newValue);
                }
              }}
              onMouseEnter={() => setJobIdIsHovered(true)}
              onMouseLeave={() => setJobIdIsHovered(false)}
            />{" "}
          </p>
          <div className="h-12 mb-1" />
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-1">
          <p className="font-medium c1">Expiration</p>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <DatePicker
              className="max-w-[284px]"
              size="sm"
              value={exp}
              onChange={(date) => checkDate(date)}
              errorMessage={datePickerErrorMessage}
              isInvalid={datePickerErrorMessage ? true : false}
            />
          </div>
          {!datePickerErrorMessage && exp && (
            <p className="text-xs c3">
              This token will expire in{" "}
              {Math.ceil(
                (exp.toDate().getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </p>
          )}{" "}
          {!datePickerErrorMessage && !exp && (
            <p className="text-xs c3">
              Set a custom expiration date up to one year from today
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="w-full flex flex-row items-center justify-end gap-6">
            <button
              disabled
              className="text-embloy-purple-lighter h-8 px-4 border-[2px] border-embloy-purple-lighter outline-none select-all rounded-full cursor-wait"
            >
              <p className="select-none">Loading</p>
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-row items-center justify-end gap-6">
            {success != null ? (
              success ? (
                <div
                  title="Wait 5 seconds before creating a new token"
                  className="text-embloy-purple-light h-8 px-4 border-[2px] border-transparent hover:border-transparent outline-none select-all rounded-full"
                >
                  <p className="select-none">Copied to clipboard!</p>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-end gap-2">
                  <p className="select-none text-red-500">
                    Something went wrong. Try again!
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="text-embloy-purple-light hover:text-embloy-purple-lighter h-8 px-4 border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none select-all rounded-full"
                  >
                    <p className="select-none">Generate</p>
                  </button>
                </div>
              )
            ) : (
              <button
                onClick={handleGenerate}
                className="text-embloy-purple-light hover:text-embloy-purple-lighter h-8 px-4 border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none select-all rounded-full"
              >
                <p className="select-none">Generate</p>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
