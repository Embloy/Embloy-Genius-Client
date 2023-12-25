import React, {useContext, useEffect, useState} from "react";

import {UserContext} from "@/app/components/misc/UserContext";
import Image from "next/image";

enum Subscription {
    basic = "Embloy Smart",
    premium = "Embloy Genius"
}

enum Interval {
    cpa = "/application",
    l = " lumpsum",
    m = "/month",
    y = "/year"
}
type FunctionalitiesType = { [key: string]: string };
function SubscriptionItem({name, text, disabled, img, subscribed, functionalities, price, interval }) {
    let subscription_name = Subscription[name];
    let interval_name = Interval[interval];
    if (subscription_name !== undefined && interval_name !== undefined){
        if (!subscribed){ //unsubscribed
            return (
                <div className="max-w-[350px] flex flex-col items-start justify-start gap-4">
                    <div className="flex flex-col items-start justify-start border border-gray-700 rounded-lg ">
                        <div className="flex flex-col items-start justify-start px-4 py-2 gap-4">
                            <div className="flex flex-row items-center justify-start">
                                <Image
                                    src={img}
                                    alt={name}
                                    height="50"
                                    width="50"
                                    className="relative ml-1"
                                />
                                {disabled && (
                                    <div className="ml-3 border border-gray-700 bg-black px-2 rounded-full">
                                        <p className="text-gray-700 text-xs">Functionality disabled</p>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="w-full h-px bg-gray-700" />
                        <div className="flex flex-col items-start justify-start px-4 py-2">
                            <h1 className="text-white">{text}</h1>
                        </div>
                        <div className="w-full h-px bg-gray-700" />
                        <div className="w-full flex flex-col items-start justify-start px-4 py-2 gap-4">
                            {Object.entries(functionalities).map(([key, value]) => (
                                <div key={key} className="w-full flex flex-row items-center justify-between text-white">
                                    <p>{key}</p>
                                    <p>{value}</p>
                                </div>
                            ))}
                            <div className="w-full flex flex-row items-center justify-between text-white">
                                <p>Price</p>
                                <p>{price}{interval_name}</p>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-700" />
                        <div className="w-full flex flex-col items-start justify-start px-4 py-2 gap-4">
                            <div className="w-full flex flex-row items-center justify-between">
                                <button className="rounded-full text-embloy-purple-light hover:underline text-sm">
                                    <p>Learn more</p>
                                </button>
                                <button className="border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter rounded-full px-2 text-embloy-purple-light hover:text-embloy-purple-lighter text-sm">
                                    <p>Buy</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }

        //subscribed

        return (
            <div />
        )
    }
}



export function SubscriptionSettings() {
    const [notificationsIsHovered, setNotificationsIsHovered] = useState(false);
    const handleNotificationsHover = () => {
        setNotificationsIsHovered(true);
    };

    const handleNotificationsNotHover = () => {
        setNotificationsIsHovered(false);
    };

    let user = useContext(UserContext);
    const [notificationEmails, setNotificationEmails] = useState({});
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        if (user && !notificationEmails[user.email]) {
            setNotificationEmails((prevEmails) => ({
                ...prevEmails,
                [user.email]: true, // todo: repace with locic that checks wheter this mail is actually in the notifications
            }));
        }
    }, [user, notificationEmails]);

    const handleNotificationEmails = (email, isChecked) => {
        setNotificationEmails((prevEmails) => ({
            ...prevEmails,
            [email]: isChecked,
        }));
    };

    const addNewEmail = () => {
        if (newEmail.trim() !== '') {
            setNotificationEmails((prevEmails) => ({
                ...prevEmails,
                [newEmail.trim()]: false,
            }));
            setNewEmail('');
        }
    };


    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium">Subscriptions</h1>
                <div className="border border-gray-700 bg-black px-2 rounded-full">
                    <p className="text-gray-700 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="text-gray-400">
                    Manage plans for personal and commercial use.
                    <a
                        className="px-1 italic text-embloy-purple-lighter hover:underline cursor-pointer"
                        href="https://about.embloy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn more
                    </a>
                    about the offered subscription options.
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
                <div className="flex flex-wrap gap-4 justify-center">
                    <SubscriptionItem name={"basic"} text={"Integrate Embloy in your website and receive applications via the Embloy API."} disabled={false} img={"/img/smart.svg"} subscribed={false} price={"€2"} interval={"cpa"} functionalities={{test: 'Description of feature 1',}}  />
                    <SubscriptionItem name={"premium"} text={"Smart becomes REALLY smart. Gain access to candidate profiles AI assessed to match your indiviual requirements."} disabled={true} img={"/img/genius.svg"} subscribed={false} price={"€2"} interval={"cpa"} functionalities={{feature1: 'Description of feature 1',}}/>
                </div>
            </div>
        </div>
    )
}