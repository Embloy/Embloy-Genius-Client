"use client";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import { columns} from "@/app/recruitment/jobs_columns";
import { JobDataTable} from "@/app/recruitment/JobDataTable";
import './locals.css'
import Image from "next/image";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const tet_jobs = [
    {id:0, position: "CEO", salary:500, currency: 0},
    {id:1, position: "CTO", salary:400, currency: 0},
    {id:2, position: "COO", salary:400, currency: 0},
    {id:3, position: "CScrumO (prsudo c level Lakei als joke)", salary:400, currency: 0},
    {id:4, position: "CBarO", salary:400, currency: 0},
    {id:5, position: "CIO", salary:400, currency: 0},
    {id:6, position: "CHrO", salary:400, currency: 0},
    {id:7, position: "CPO", salary:400, currency: 0},
    {id:8, position: "CLO", salary:400, currency: 0},
    {id:9, position: "Depp", salary:400, currency: 0},
    {id:10, position: "Lakei", salary:400, currency: 0},
    {id:11, position: "Lakei", salary:400, currency: 0},
    {id:12, position: "Lakei", salary:400, currency: 0},
    {id:13, position: "Lakei", salary:400, currency: 0},
    {id:14, position: "Lakei", salary:400, currency: 0},
    {id:15, position: "Lakei", salary:400, currency: 0},
    {id:16, position: "Lakei", salary:400, currency: 0},
    {id:17, position: "Lakei", salary:400, currency: 0},
    {id:18, position: "Lakei", salary:400, currency: 0},

]


const test_jobs = [
    {job_id:0, job_type:"Scrum", status:1, start_slot:"2029-06-08T08:12:00.000Z", position:"CEO", view_count:1289, application_count:23, created_at: "2023-11-21T09:52:58.547Z", updated_at: "2023-11-21T09:52:58.547Z"},
    {job_id:1, job_type:"Scrum", status:0, start_slot:"2029-06-08T08:12:00.000Z", position:"COO", view_count:9289, application_count:13, created_at: "2023-11-21T09:52:58.547Z", updated_at: "2023-11-21T09:52:58.547Z"},


]



export default function Jobs() {
    // subpages
    const [currentSubPageID, setcurrentSubPageID] = useState(0);
    const switchSubPage = (id) => {
        if (currentSubPageID != id){
            setcurrentSubPageID(id);
        }
    }
    const jobsSubPageID = 0;
    const jobsSubPage = () => {
        switchSubPage(jobsSubPageID);
    };
    const applicationsSubPageID = 1;
    const applicationsSubPage = () => {
        switchSubPage(applicationsSubPageID);
    };
    const promosSubPageID = 2;
    const promosSubPage = () => {
        switchSubPage(promosSubPageID);
    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    // fetch data
    // todo: remove dummy and fetch actual jobs

    const data = test_jobs


    return (
        <main className=" text-white flex min-h-screen h-full flex-col items-center justify-start">
            <div className="z-10 max-w-6xl w-full min-h-screen h-full border-l-[1px] border-r-[1px] border-gray-700 flex flex-col items-center justify-start">
                <div className="w-full flex flex-col items-center justify-start p-4">
                    <div className="w-full flex flex-row items-center justify-between my-4">
                        <h1 className="font-medium text-2xl ">Recruitment Portal</h1>
                    </div>
                    <div className="w-full h-4" />
                </div>

                <div className="w-full flex flex-col items-center justify-start">
                    <ul className="text-sm w-full flex flex-row items-center justify-start">
                        <li onClick={jobsSubPage} className={cn(currentSubPageID === jobsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full" >
                                <p>Jobs</p>
                            </div>
                        </li>
                        <li onClick={applicationsSubPage} className={cn(currentSubPageID === applicationsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full" >
                                <p>Applications</p>
                            </div>
                        </li>
                        <li onClick={promosSubPage} className={cn(currentSubPageID === promosSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full" >
                                <p>Promotions</p>
                            </div>
                        </li>
                        <li className="cursor-default text-transparent select-none w-screen flex flex-row items-center justify-start border-b-[1px] border-gray-700 p-2" >
                            <button className="cursor-default">
                                <p>Promotions</p>
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="w-full flex flex-col items-center justify-start">
                    {currentSubPageID === jobsSubPageID && (
                        <div className="container mx-auto">
                            <JobDataTable columns={columns} data={data}  />
                        </div>
                    )}



                </div>
                {currentSubPageID === promosSubPageID && (
                <Modal
                    isOpen={true}
                    scrollBehavior="inside"
                    size="5xl"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat
                                        consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                                        incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                                        aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                        nisi consectetur esse laborum eiusmod pariatur proident Lorem
                                        eiusmod et. Culpa deserunt nostrud ad veniam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                        Magna exercitation reprehenderit magna aute tempor cupidatat
                                        consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                                        incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                                        aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                        nisi consectetur esse laborum eiusmod pariatur proident Lorem
                                        eiusmod et. Culpa deserunt nostrud ad veniam.
                                    </p>
                                    <p>
                                        Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                                        duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                                        eiusmod. Et mollit incididunt nisi consectetur esse laborum
                                        eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
                                        nostrud ad veniam. Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Nullam pulvinar risus non risus hendrerit
                                        venenatis. Pellentesque sit amet hendrerit risus, sed
                                        porttitor quam. Magna exercitation reprehenderit magna aute
                                        tempor cupidatat consequat elit dolor adipisicing. Mollit
                                        dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                        officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et
                                        mollit incididunt nisi consectetur esse laborum eiusmod
                                        pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
                                        veniam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat
                                        consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                                        incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                                        aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                        nisi consectetur esse laborum eiusmod pariatur proident Lorem
                                        eiusmod et. Culpa deserunt nostrud ad veniam.
                                    </p>
                                    <p>
                                        Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                                        duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                                        eiusmod. Et mollit incididunt nisi consectetur esse laborum
                                        eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
                                        nostrud ad veniam. Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Nullam pulvinar risus non risus hendrerit
                                        venenatis. Pellentesque sit amet hendrerit risus, sed
                                        porttitor quam. Magna exercitation reprehenderit magna aute
                                        tempor cupidatat consequat elit dolor adipisicing. Mollit
                                        dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                        officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et
                                        mollit incididunt nisi consectetur esse laborum eiusmod
                                        pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
                                        veniam.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                )}
            </div>
        </main>


    );

}