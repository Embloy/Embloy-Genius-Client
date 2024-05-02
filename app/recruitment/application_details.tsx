import { get_core } from "@/lib/misc_requests";
import {
  Application,
  ApplicationAnswer,
  ApplicationAttachment,
} from "@/lib/types/application";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  cn,
  useDisclosure,
} from "@nextui-org/react";

type ApplicationDetailsProps = {
  application: Application;
  onUpdateSuccess: () => void;
  onClose: () => void;
};

type ApplicationDetailsResponse = {
  application: {
    job_id: number;
    user_id: number;
    updated_at: string;
    created_at: string;
    status: string;
    application_text: string;
    application_documents: any;
    response: string;
    deleted_at: string | null;
  };
  application_attachment: ApplicationAttachment;
  application_answers: ApplicationAnswer[];
};

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  onUpdateSuccess,
  onClose,
}) => {
  const router = useRouter();
  const [applicationDetails, setApplicationDetails] =
    useState<ApplicationDetailsResponse | null>(null);
  const applicationModal = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const fetchApplicationDetails = async () => {
    if (!application) return;
    try {
      const data = await get_core(
        `/jobs/${application.job_id}/applications/${application.user_id}`,
        router
      );
      console.log("Response: ", data);
      setApplicationDetails(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleMoreInfoClick = async () => {
    setIsLoading(true);
    applicationModal.onOpen();
    await fetchApplicationDetails();
    setIsLoading(false);
  };

  const handleAccept = async () => {
    if (!application) return;
    try {
      const response = await get_core(
        `/jobs/${application.job_id}/applications/${application.user_id}/accept`,
        router,
        false,
        "PATCH"
      );
      if (response.ok) {
        onUpdateSuccess();
      } else {
        // Handle error
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleReject = async () => {
    if (!application) return;
    try {
      const response = await get_core(
        `/jobs/${application.job_id}/applications/${application.user_id}/reject`,
        router,
        false,
        "PATCH"
      );
      if (response.ok) {
        onUpdateSuccess();
      } else {
        // Handle error
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Application Details</h2>
      <p>Job ID: {application.job_id}</p>
      <p>User ID: {application.user_id}</p>
      <p>Application Text: {application.application_text}</p>
      <p>Status: {application.status}</p>
      <p>Created At: {application.created_at}</p>
      <p>Updated At: {application.updated_at}</p>
      <button
        onClick={handleAccept}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        Accept
      </button>
      <button
        onClick={handleReject}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        Reject
      </button>
      <button
        onClick={handleMoreInfoClick}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        More Info
      </button>
      <Modal
        isOpen={applicationModal.isOpen}
        scrollBehavior="normal"
        className="w-max cursor-auto "
        onOpenChange={applicationModal.onOpenChange}
      >
        <ModalContent className="w-full md:w-3/4 lg:w-1/2">
          <>
            <ModalHeader className="gap-1 items-center justify-center">
              Application Details
            </ModalHeader>
            <ModalBody
              className={cn(isLoading ? "opacity-25 " : "opacity-100", "flex items-center justify-center")}
            >
              {isLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mr-2 text-gray-500 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : applicationDetails ? (
                <div className="w-full overflow-auto">
                  <table className="table-auto w-full text-left whitespace-no-wrap">
                    <tbody>
                      <tr>
                        <th className="px-4 py-2">Job ID</th>
                        <td className="px-4 py-2">
                          {applicationDetails.application.job_id}
                        </td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2">User ID</th>
                        <td className="px-4 py-2">
                          {applicationDetails.application.user_id}
                        </td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2">Application Text</th>
                        <td className="px-4 py-2">
                          {applicationDetails.application.application_text}
                        </td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2">Status</th>
                        <td className="px-4 py-2">
                          {applicationDetails.application.status}
                        </td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2">Created At</th>
                        <td className="px-4 py-2">
                          {applicationDetails.application.created_at}
                        </td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2">Updated At</th>
                        <td className="px-4 py-2">
                          {applicationDetails.application.updated_at}
                        </td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2">Response</th>
                        <td className="px-4 py-2">
                          {applicationDetails.application.response}
                        </td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2">Attachment URL</th>
                        <td className="px-4 py-2">
                          <a
                            href={applicationDetails.application_attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {applicationDetails.application_attachment.url}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 className="mt-4">Application Answers</h3>
                  {applicationDetails.application_answers.map(
                    (answer, index) => (
                      <div
                        key={index}
                        className="border-t border-gray-200 pt-2"
                      >
                        <p>
                          <strong>Answer ID:</strong> {answer.id}
                        </p>
                        <p>
                          <strong>Answer:</strong> {answer.answer}
                        </p>
                      </div>
                    )
                  )}
                  <br />
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <h2 className="font-bold text-lg">
                    Application Details Unavailable
                  </h2>
                  <p>
                    Please ensure you have an active subscription.
                    <br />
                    If the issue persists, please contact our support.
                  </p>
                </div>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ApplicationDetails;
