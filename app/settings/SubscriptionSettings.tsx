import React from "react";
import Image from "next/image";
import {Interval, Subscription} from "@/lib/utils/enums";
import '../globals.css';
import { siteConfig } from "@/config/site";


function SubscriptionItem({name, text, disabled, img, subscribed, uri}) {
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
                                    <div className="ml-3 border border-gray-700 px-2 rounded-full">
                                        <p className="c3 text-xs">Functionality disabled</p>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="w-full h-px bg-gray-700"/>
                        <div className="flex flex-col items-start justify-start px-4 py-2">
                            <h1 className="c0">{text}</h1>
                        </div>
                        <div className="w-full h-px bg-gray-700"/>
                        <div className="w-full h-px bg-gray-700"/>
                        <div className="w-full flex flex-col items-start justify-start px-4 py-2 gap-4">
                            <div className="w-full flex flex-row items-center justify-between">
                                <button className="rounded-full text-embloy-purple-lighter hover:underline text-sm bgneg">
                                    <p>Learn more</p>
                                </button>
                                <a
                                    href={`${siteConfig.api_url}/resource/store/"` + uri}
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
                <h1 className="c2 text-lg font-medium">Subscriptions</h1>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="c2">
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
                    {
                        store.map((product, index) => {

                            const icon_url = product["product_image_url"];
                            const product_name = product["product_name"];
                            const product_text = product["description"]["short_text"];
                            const product_uri = product["unique_identifier"];
                            return (
                                <SubscriptionItem name={product_name}
                                                  text={product_text}
                                                  disabled={false} img={icon_url} subscribed={false}
                                                  key={index}
                                                  uri={product_uri}
                                />
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}