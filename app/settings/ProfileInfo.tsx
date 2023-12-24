import React, {useContext, useState} from "react";
import {UserContext} from "@/app/components/misc/UserContext";
import Image from "next/image";

export function ProfileInfo() {
    let user = useContext(UserContext)
    const [changesMade, setChangesMade] = useState(false);
    const [nameIsHovered, setNameIsHovered] = useState(false);
    const [nameIsClicked, setNameIsClicked] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const nameHover = () => {
        setNameIsHovered(true);
    }
    const nameNotHover = () => {
        setNameIsHovered(false);
    }
    const nameClick = () => {
        if (firstName == '') {
            setFirstName(user.first_name)
        }
        if (lastName == '') {
            setLastName(user.last_name)
        }
        setNameIsClicked(!nameIsClicked);
    }
    const handleNameSubmit = (e) => {
        if (e.key === 'Enter') {
            nameClick();
            checkChanges();
        }
    }

    const [fNameIsHovered, setfNameIsHovered] = useState(false);
    const fNameHover = () => {
        setfNameIsHovered(true);
    }
    const fNameNotHover = () => {
        setfNameIsHovered(false);
    }

    const [lNameIsHovered, setlNameIsHovered] = useState(false);
    const lNameHover = () => {
        setlNameIsHovered(true);
    }
    const lNameNotHover = () => {
        setlNameIsHovered(false);
    }

    const [emailIsHovered, setEmailIsHovered] = useState(false);
    const [emailIsClicked, setEmailIsClicked] = useState(false);
    const [email, setEmail] = useState('');
    const emailHover = () => {
        setEmailIsHovered(true);
    }
    const emailNotHover = () => {
        setEmailIsHovered(false);
    }
    const emailClick = () => {
        if (email == ''){
            setEmail(user.email);
        }
        setEmailIsClicked(!emailIsClicked);
    }
    const handleEmailSubmit = (e) => {
        if (e.key === 'Enter') {
            emailClick();
            checkChanges();

        }
    }

    const checkChanges = () => {
        if(email != '' && email != user.email && !changesMade){
            setChangesMade(true);
        }
        if((firstName != '' && firstName != user.first_name || lastName != '' && lastName != user.last_name)&& !changesMade  ){
            setChangesMade(true);
        }
        if (email == user.email && firstName == user.first_name && lastName == user.last_name){
            setChangesMade(false)
        }
    }



    return (

        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <div className="border border-gray-700 bg-black px-2 rounded-full">
                    <p className="text-gray-700 text-xs">Functionality disabled</p>
                </div>
            </div>

            {user ? (
                <div className="flex flex-row items-start justify-start border border-gray-700 rounded-lg mb-6 px-4 py-2 gap-10">
                    <div className="flex flex-col items-start justify-start ">

                        {nameIsClicked ? (
                            <div
                                className="flex flex-row items-start justify-start py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-white">Name</p>
                                <input
                                    className={fNameIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"}
                                    type="text"
                                    name="First Name"
                                    value={firstName}
                                    required={true}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onMouseEnter={fNameHover}
                                    onMouseLeave={fNameNotHover}
                                    onKeyPress={handleNameSubmit}
                                />
                                <div className="w-2" />
                                <input
                                    className={lNameIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"}
                                    type="text"
                                    name="Last Name"
                                    value={lastName}
                                    required={true}
                                    onChange={(e) => setLastName(e.target.value)}
                                    onMouseEnter={lNameHover}
                                    onMouseLeave={lNameNotHover}
                                    onKeyPress={handleNameSubmit}
                                />
                            </div>
                        ) : (
                            <div onMouseEnter={nameHover} onMouseLeave={nameNotHover}
                                 className="flex flex-row items-start justify-start py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-white">Name</p>
                                <p className="w-[200px] left px-4 text-white">{firstName == '' ? user.first_name : firstName} {lastName == '' ? user.last_name : lastName}</p>
                                {nameIsHovered && (
                                    <button onClick={nameClick}
                                            className="text-xs italic text-gray-700 hover:underline cursor-not-allowed"
                                            disabled={true}
                                    >
                                        <p>Edit</p>
                                    </button>
                                )}
                            </div>
                        )}
                        {emailIsClicked ? (
                            <div
                                className="flex flex-row items-start justify-start py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-white">Email</p>
                                <input
                                    className={emailIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"}
                                    type="email"
                                    name="Email"
                                    value={email}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onMouseEnter={emailHover}
                                    onMouseLeave={emailNotHover}
                                    onKeyPress={handleEmailSubmit}
                                />
                            </div>
                        ) : (
                            <div onMouseEnter={emailHover} onMouseLeave={emailNotHover}
                                 className="flex flex-row items-start justify-start py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-white">Email</p>
                                <p className="w-[200px] left px-4 text-white">{email == '' ? user.email : email}</p>
                                {emailIsHovered && (
                                    <button onClick={emailClick}
                                            className="text-xs italic text-gray-700 hover:underline cursor-not-allowed "
                                            disabled={true}
                                    >
                                        <p>Edit</p>
                                    </button>
                                )}
                            </div>
                        )}

                        {user.user_type == "company" && (
                            <div className="flex flex-row items-start justify-between py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-white">Company</p>
                                <p className="w-[300px] left px-4 text-white">@MUSS NOCH WEG</p>
                            </div>
                        )}

                        {changesMade && (
                            <button
                                className="my-4 px-4 py-1 bg-black border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter text-embloy-purple-light hover:text-embloy-purple-lighter rounded-full cursor-pointer"
                            >
                                Update
                            </button>
                        )}
                    </div>

                    <div className="relative inline-block">
                        <Image
                            src="https://about.embloy.com/assets/banner_2-38f470bc.png"
                            alt="Logo"
                            height="30"
                            width="30"
                            className="rounded-full w-40 h-40 border border-gray-700"
                        />
                        <button
                            className="absolute bottom-4 left-4 px-4 py-1 bg-black border-[2px] rounded-full cursor-not-allowed border-gray-700 text-gray-700"
                            disabled={true}
                            id="border-embloy-purple-light hover:border-embloy-purple-lighter text-embloy-purple-light hover:text-embloy-purple-lighter"
                        >
                            Edit
                        </button>
                    </div>


                </div>
            ) : (
                <button>Sign in</button>
            )}

        </div>
    )
}