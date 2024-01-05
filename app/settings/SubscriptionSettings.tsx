import React, {useContext, useEffect, useState} from "react";

import {UserContext} from "@/app/components/misc/UserContext";
import Image from "next/image";
import {Interval, Subscription} from "@/lib/utils/enums";
import {StoreContext} from "@/app/components/misc/StoreWrapper";
import LoadingScreen from "@/app/components/misc/LoadingScreen";


type FunctionalitiesType = { [key: string]: string };

function SubscriptionItem({name, text, disabled, img, subscribed}) {
    let subscription_name = Subscription[name];
    if (subscription_name !== undefined) {
        if (!subscribed) { //unsubscribed
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
                                    className="relative"
                                />
                                {disabled && (
                                    <div className="ml-3 border border-gray-700 bg-black px-2 rounded-full">
                                        <p className="text-gray-700 text-xs">Functionality disabled</p>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="w-full h-px bg-gray-700"/>
                        <div className="flex flex-col items-start justify-start px-4 py-2">
                            <h1 className="text-white">{text}</h1>
                        </div>
                        <div className="w-full h-px bg-gray-700"/>
                        <div className="w-full h-px bg-gray-700"/>
                        <div className="w-full flex flex-col items-start justify-start px-4 py-2 gap-4">
                            <div className="w-full flex flex-row items-center justify-between">
                                <button className="rounded-full text-embloy-purple-lighter hover:underline text-sm">
                                    <p>Learn more</p>
                                </button>
                                <a
                                    href="http://localhost:8080/resource/store/5f888fba-055a-49c0-a005-895a4068ae7f"
                                    className="border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter rounded-full px-2 text-embloy-purple-light hover:text-embloy-purple-lighter text-sm">
                                    <p>Buy</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }

        //subscribed

        return (
            <div/>
        )
    }
}


export function SubscriptionSettings({store}) {

    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium">Subscriptions</h1>
                {/*<div className="border border-gray-700 bg-black px-2 rounded-full">
                    <p className="text-gray-700 text-xs">Functionality disabled</p>
                </div>*/}
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
                    {store.map((product, index) => {

                        const icon_url = product["product_image_url"];
                        const product_name = product["product_name"];
                        const product_text = product["description"]["short_text"];
                        return (
                            <SubscriptionItem name={product_name}
                                              text={product_text}
                                              disabled={false} img={icon_url} subscribed={false}
                                              key={index}
                            />
                        )
                    })
                    }

                </div>
            </div>
        </div>
    )
}