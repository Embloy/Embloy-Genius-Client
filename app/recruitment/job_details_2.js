"use client";
import React, { useEffect, useState, useContext, useRef} from "react";
import { EmbloyH1Editable, EmbloyP } from "@/app/components/ui/misc/text"
import { EmbloyChildrenAdvanced, EmbloyH, EmbloyV } from "@/app/components/ui/misc/stuff";
import { CheckIcon, XIcon } from "lucide-react";
import { applicationColumns } from "@/app/recruitment/application_columns";
import { ApplicationDataTable } from "@/app/recruitment/ApplicationDataTable";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { EmbloyInput, EmbloySelectOption } from "@/app/components/ui/misc/input";

export const JobDetails2 = ({job, handleDataReload, onChange, editable}) => {
    const [details, setDetails] = useState(job);
    const [locationStatus, setLocationStatus] = useState(false);
    const [location, setLocation] = useState({city: job.city, address: job.address, postal_code: job.postal_code, country_code: job.country_code});

    const handle_change = (e, field) => {
        setDetails({...details, [field]: e.target.value});
    }

    const location_text = () => {
        let string = "";
        if (location.address && location.address !== "") {
            string += location.address + ", ";
        }
        if (location.city && location.city !== "") {
            string += location.city + ", ";
        }
        if (location.postal_code && location.postal_code !== "") {
            string += location.postal_code + ", ";
        }
        if (location.country_code && location.country_code !== "") {
            string += location.country_code;
        }
        if (string.endsWith(", ")) {
            string = string.slice(0, -2);
        }
        if (string === "") {
            string = null;
        }
        return string;
    }


    useEffect (() => {
        console.log("DETAILS", details.job_type)
    }, [details])


    const areas = [
        {value: "Software_Development", label: "Software Development"},
        {value: "Product_Management", label: "Product Management"},
        {value: "Cloud_and_DevOps", label: "Cloud & DevOps"},
        {value: "Data_Science_and_AI", label: "Data Science & AI"},
        {value: "Cybersecurity_and_Compliance", label: "Cybersecurity & Compliance"},
        {value: "UI_UX_Design_and_Research", label: "UI/UX Design & Research"},
        {value: "Quality_Assurance_and_Testing", label: "Quality Assurance & Testing"},
        {value: "System_Architecture_and_Infrastructure", label: "System Architecture & Infrastructure"},
        {value: "Database_and_Network_Management", label: "Database & Network Management"},
        {value: "IT_Support_and_Technical_Operations", label: "IT Support & Technical Operations"},
        {value: "Business_Analysis_and_Strategy", label: "Business Analysis & Strategy"},
        {value: "Project_Management", label: "Project Management"},
        {value: "Human_Resources_and_Recruiting", label: "Human Resources & Recruiting"},
        {value: "Sales_and_Customer_Success", label: "Sales & Customer Success"},
        {value: "Marketing_and_Brand_Management", label: "Marketing & Brand Management"},
        {value: "Finance_and_Risk_Management", label: "Finance & Risk Management"},
        {value: "Legal", label: "Legal"},
        {value: "Supply_Chain_and_Operations", label: "Supply Chain & Operations"},
        {value: "Research_and_Development", label: "Research & Development"},
        {value: "Procurement", label: "Procurement"},
        {value: "Gaming_and_Entertainment", label: "Gaming & Entertainment"},
        {value: "Corporate_Responsibility", label: "Corporate Responsibility"},
        {value: "Public_Relations_and_Corporate_Communications", label: "Public Relations & Corporate Communications"},
        {value: "Training_and_Learning_Development", label: "Training & Learning Development"},
        {value: "Investor_Relations", label: "Investor Relations"},
        {value: "Partnerships_and_Alliances", label: "Partnerships & Alliances"},
        {value: "Customer_Support_and_Service_Excellence", label: "Customer Support & Service Excellence"},
        {value: "Miscellaneous", label: "Miscellaneous"},
        {value: "Mobile_and_IoT_Solutions", label: "Mobile & IoT Solutions"},
        {value: "Product_Development", label: "Product Development"},
        {value: "Manufacturing", label: "Manufacturing"}
    ];

    const country_codes = [
        {value: "AD", label: "Andorra"},
        {value: "AE", label: "United Arab Emirates"},
        {value: "AF", label: "Afghanistan"},
        {value: "AG", label: "Antigua and Barbuda"},
        {value: "AI", label: "Anguilla"},
        {value: "AL", label: "Albania"},
        {value: "AM", label: "Armenia"},
        {value: "AO", label: "Angola"},
        {value: "AQ", label: "Antarctica"},
        {value: "AR", label: "Argentina"},
        {value: "AS", label: "American Samoa"},
        {value: "AT", label: "Austria"},
        {value: "AU", label: "Australia"},
        {value: "AW", label: "Aruba"},
        {value: "AX", label: "Åland Islands"},
        {value: "AZ", label: "Azerbaijan"},
        {value: "BA", label: "Bosnia and Herzegovina"},
        {value: "BB", label: "Barbados"},
        {value: "BD", label: "Bangladesh"},
        {value: "BE", label: "Belgium"},
        {value: "BF", label: "Burkina Faso"},
        {value: "BG", label: "Bulgaria"},
        {value: "BH", label: "Bahrain"},
        {value: "BI", label: "Burundi"},
        {value: "BJ", label: "Benin"},
        {value: "BL", label: "Saint Barthélemy"},
        {value: "BM", label: "Bermuda"},
        {value: "BN", label: "Brunei Darussalam"},
        {value: "BO", label: "Bolivia"},
        {value: "BQ", label: "Bonaire, Sint Eustatius and Saba"},
        {value: "BR", label: "Brazil"},
        {value: "BS", label: "Bahamas"},
        {value: "BT", label: "Bhutan"},
        {value: "BV", label: "Bouvet Island"},
        {value: "BW", label: "Botswana"},
        {value: "BY", label: "Belarus"},
        {value: "BZ", label: "Belize"},
        {value: "CA", label: "Canada"},
        {value: "CC", label: "Cocos (Keeling) Islands"},
        {value: "CD", label: "Congo (Democratic Republic)"},
        {value: "CF", label: "Central African Republic"},
        {value: "CG", label: "Congo"},
        {value: "CH", label: "Switzerland"},
        {value: "CI", label: "Côte d'Ivoire"},
        {value: "CK", label: "Cook Islands"},
        {value: "CL", label: "Chile"},
        {value: "CM", label: "Cameroon"},
        {value: "CN", label: "China"},
        {value: "CO", label: "Colombia"},
        {value: "CR", label: "Costa Rica"},
        {value: "CU", label: "Cuba"},
        {value: "CV", label: "Cabo Verde"},
        {value: "CW", label: "Curaçao"},
        {value: "CX", label: "Christmas Island"},
        {value: "CY", label: "Cyprus"},
        {value: "CZ", label: "Czechia"},
        {value: "DE", label: "Germany"},
        {value: "DJ", label: "Djibouti"},
        {value: "DK", label: "Denmark"},
        {value: "DM", label: "Dominica"},
        {value: "DO", label: "Dominican Republic"},
        {value: "DZ", label: "Algeria"},
        {value: "EC", label: "Ecuador"},
        {value: "EE", label: "Estonia"},
        {value: "EG", label: "Egypt"},
        {value: "EH", label: "Western Sahara"},
        {value: "ER", label: "Eritrea"},
        {value: "ES", label: "Spain"},
        {value: "ET", label: "Ethiopia"},
        {value: "FI", label: "Finland"},
        {value: "FJ", label: "Fiji"},
        {value: "FK", label: "Falkland Islands"},
        {value: "FM", label: "Micronesia"},
        {value: "FO", label: "Faroe Islands"},
        {value: "FR", label: "France"},
        {value: "GA", label: "Gabon"},
        {value: "GB", label: "United Kingdom"},
        {value: "GD", label: "Grenada"},
        {value: "GE", label: "Georgia"},
        {value: "GF", label: "French Guiana"},
        {value: "GG", label: "Guernsey"},
        {value: "GH", label: "Ghana"},
        {value: "GI", label: "Gibraltar"},
        {value: "GL", label: "Greenland"},
        {value: "GM", label: "Gambia"},
        {value: "GN", label: "Guinea"},
        {value: "GP", label: "Guadeloupe"},
        {value: "GQ", label: "Equatorial Guinea"},
        {value: "GR", label: "Greece"},
        {value: "GT", label: "Guatemala"},
        {value: "GU", label: "Guam"},
        {value: "GW", label: "Guinea-Bissau"},
        {value: "GY", label: "Guyana"},
        {value: "HK", label: "Hong Kong"},
        {value: "HM", label: "Heard and McDonald Islands"},
        {value: "HN", label: "Honduras"},
        {value: "HR", label: "Croatia"},
        {value: "HT", label: "Haiti"},
        {value: "HU", label: "Hungary"},
        {value: "ID", label: "Indonesia"},
        {value: "IE", label: "Ireland"},
        {value: "IL", label: "Israel"},
        {value: "IM", label: "Isle of Man"},
        {value: "IN", label: "India"},
        {value: "IO", label: "British Indian Ocean Territory"},
        {value: "IQ", label: "Iraq"},
        {value: "IR", label: "Iran"},
        {value: "IS", label: "Iceland"},
        {value: "IT", label: "Italy"},
        {value: "JE", label: "Jersey"},
        {value: "JM", label: "Jamaica"},
        {value: "JO", label: "Jordan"},
        {value: "JP", label: "Japan"},
        {value: "KE", label: "Kenya"},
        {value: "KG", label: "Kyrgyzstan"},
        {value: "KH", label: "Cambodia"},
        {value: "KI", label: "Kiribati"},
        {value: "KM", label: "Comoros"},
        {value: "KN", label: "Saint Kitts and Nevis"},
        {value: "KP", label: "North Korea"},
        {value: "KR", label: "South Korea"},
        {value: "KW", label: "Kuwait"},
        {value: "KY", label: "Cayman Islands"},
        {value: "KZ", label: "Kazakhstan"},
        {value: "LA", label: "Laos"},
        {value: "LB", label: "Lebanon"},
        {value: "LC", label: "Saint Lucia"},
        {value: "LI", label: "Liechtenstein"},
        {value: "LK", label: "Sri Lanka"},
        {value: "LR", label: "Liberia"},
        {value: "LS", label: "Lesotho"},
        {value: "LT", label: "Lithuania"},
        {value: "LU", label: "Luxembourg"},
        {value: "LV", label: "Latvia"},
        {value: "LY", label: "Libya"},
        {value: "MA", label: "Morocco"},
        {value: "MC", label: "Monaco"},
        {value: "MD", label: "Moldova"},
        {value: "ME", label: "Montenegro"},
        {value: "MF", label: "Saint Martin"},
        {value: "MG", label: "Madagascar"},
        {value: "MH", label: "Marshall Islands"},
        {value: "MK", label: "North Macedonia"},
        {value: "ML", label: "Mali"},
        {value: "MM", label: "Myanmar"},
        {value: "MN", label: "Mongolia"},
        {value: "MO", label: "Macao"},
        {value: "MP", label: "Northern Mariana Islands"},
        {value: "MQ", label: "Martinique"},
        {value: "MR", label: "Mauritania"},
        {value: "MS", label: "Montserrat"},
        {value: "MT", label: "Malta"},
        {value: "MU", label: "Mauritius"},
        {value: "MV", label: "Maldives"},
        {value: "MW", label: "Malawi"},
        {value: "MX", label: "Mexico"},
        {value: "MY", label: "Malaysia"},
        {value: "MZ", label: "Mozambique"},
        {value: "NA", label: "Namibia"},
        {value: "NC", label: "New Caledonia"},
        {value: "NE", label: "Niger"},
        {value: "NF", label: "Norfolk Island"},
        {value: "NG", label: "Nigeria"},
        {value: "NI", label: "Nicaragua"},
        {value: "NL", label: "Netherlands"},
        {value: "NO", label: "Norway"},
        {value: "NP", label: "Nepal"},
        {value: "NR", label: "Nauru"},
        {value: "NU", label: "Niue"},
        {value: "NZ", label: "New Zealand"},
        {value: "OM", label: "Oman"},
        {value: "PA", label: "Panama"},
        {value: "PE", label: "Peru"},
        {value: "PF", label: "French Polynesia"},
        {value: "PG", label: "Papua New Guinea"},
        {value: "PH", label: "Philippines"},
        {value: "PK", label: "Pakistan"},
        {value: "PL", label: "Poland"},
        {value: "PM", label: "Saint Pierre and Miquelon"},
        {value: "PN", label: "Pitcairn"},
        {value: "PR", label: "Puerto Rico"},
        {value: "PS", label: "Palestine"},
        {value: "PT", label: "Portugal"},
        {value: "PW", label: "Palau"},
        {value: "PY", label: "Paraguay"},
        {value: "QA", label: "Qatar"},
        {value: "RE", label: "Réunion"},
        {value: "RO", label: "Romania"},
        {value: "RS", label: "Serbia"},
        {value: "RU", label: "Russia"},
        {value: "RW", label: "Rwanda"},
        {value: "SA", label: "Saudi Arabia"},
        {value: "SB", label: "Solomon Islands"},
        {value: "SC", label: "Seychelles"},
        {value: "SD", label: "Sudan"},
        {value: "SE", label: "Sweden"},
        {value: "SG", label: "Singapore"},
        {value: "SH", label: "Saint Helena"},
        {value: "SI", label: "Slovenia"},
        {value: "SJ", label: "Svalbard and Jan Mayen"},
        {value: "SK", label: "Slovakia"},
        {value: "SL", label: "Sierra Leone"},
        {value: "SM", label: "San Marino"},
        {value: "SN", label: "Senegal"},
        {value: "SO", label: "Somalia"},
        {value: "SR", label: "Suriname"},
        {value: "SS", label: "South Sudan"},
        {value: "ST", label: "Sao Tome and Principe"},
        {value: "SV", label: "El Salvador"},
        {value: "SX", label: "Sint Maarten"},
        {value: "SY", label: "Syria"},
        {value: "SZ", label: "Eswatini"},
        {value: "TC", label: "Turks and Caicos Islands"},
        {value: "TD", label: "Chad"},
        {value: "TF", label: "French Southern Territories"},
        {value: "TG", label: "Togo"},
        {value: "TH", label: "Thailand"},
        {value: "TJ", label: "Tajikistan"},
        {value: "TK", label: "Tokelau"},
        {value: "TL", label: "Timor-Leste"},
        {value: "TM", label: "Turkmenistan"},
        {value: "TN", label: "Tunisia"},
        {value: "TO", label: "Tonga"},
        {value: "TR", label: "Turkey"},
        {value: "TT", label: "Trinidad and Tobago"},
        {value: "TV", label: "Tuvalu"},
        {value: "TW", label: "Taiwan"},
        {value: "TZ", label: "Tanzania"},
        {value: "UA", label: "Ukraine"},
        {value: "UG", label: "Uganda"},
        {value: "UM", label: "United States Minor Outlying Islands"},
        {value: "US", label: "United States"},
        {value: "UY", label: "Uruguay"},
        {value: "UZ", label: "Uzbekistan"},
        {value: "VA", label: "Vatican City"},
        {value: "VC", label: "Saint Vincent and the Grenadines"},
        {value: "VE", label: "Venezuela"},
        {value: "VG", label: "British Virgin Islands"},
        {value: "VI", label: "U.S. Virgin Islands"},
        {value: "VN", label: "Vietnam"},
        {value: "VU", label: "Vanuatu"},
        {value: "WF", label: "Wallis and Futuna"},
        {value: "WS", label: "Samoa"},
        {value: "YE", label: "Yemen"},
        {value: "YT", label: "Mayotte"},
        {value: "ZA", label: "South Africa"},
        {value: "ZM", label: "Zambia"},
        {value: "ZW", label: "Zimbabwe"}
    ];
    
    
    return (
        <EmbloyV>
            <EmbloyV className="border border-etna dark:border-nebbiolo p-1.5 gap-px rounded-md ">
                <EmbloyH className={"gap-2"}>
                    <EmbloyH className={"gap-1.5 max-w-fit"}>
                        <EmbloyChildrenAdvanced html={true} tooltip={
                            <EmbloyV className="w-52 gap-1.5 p-2">
                                <EmbloyH className="gap-1.5 items-center">
                                    <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                    <EmbloyP className={"text-xs font-semibold underline"}>Job Post Title</EmbloyP> 
                                </EmbloyH>
                                <EmbloyP className={"max-w-52 italic text-xs"}>Heading of the Job Post. May differ from the Job Position e.g.</EmbloyP> 
                                <ul className="list-disc ml-4 max-w-52">
                                    <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Title: Lead Developer for iOS Team</EmbloyP></li>
                                    <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Position: Senior Software Engineer</EmbloyP></li>
                                </ul>
                            </EmbloyV>
                        }>
                            <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Title:</EmbloyP>
                        </EmbloyChildrenAdvanced>
                        <EmbloyH1Editable className="text-xs font-normal w-36" initialText={details.title} placeholder="Job Title" onUpdate={(value) => {setDetails({...details, "title": value})}} />
                    </EmbloyH>
                    <EmbloyH className={"gap-1.5 max-w-60"}>
                        <EmbloyChildrenAdvanced html={true} tooltip={
                            <EmbloyV className="w-52 gap-1.5 p-2">
                                <EmbloyH className="gap-1.5 items-center">
                                    <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                    <EmbloyP className={"text-xs font-semibold underline"}>Job Area</EmbloyP> 
                                </EmbloyH>
                                <EmbloyP className={"max-w-52 italic text-xs break-words"}>A broad category or specialization of work, it could also be the Department, Team, or Branch e.g.</EmbloyP> 
                                <ul className="list-disc ml-4 max-w-52">
                                    <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Software Development</EmbloyP></li>
                                    <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Accounting</EmbloyP></li>
                                    <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Presales</EmbloyP></li>
                                </ul>
                            </EmbloyV>
                        }>
                            <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Area:</EmbloyP>
                        </EmbloyChildrenAdvanced>
                        
                        <EmbloyInput
                            variant="select-light"
                            onChange={(e) => setDetails({...details, "job_type": e.target.value})}
                            value={details.job_type || ""}
                            className={`w-52 text-xs ${(details.job_type && details.job_type !== "") ? "text-black dark:text-white" : "text-testaccio dark:text-nebbiolo"}`}
                        >
                            <EmbloySelectOption placeholder={true} className="text-xs text-black dark:text-white">
                                Select Job Area
                            </EmbloySelectOption>
                            {areas.map((area, index) => {
                                return <EmbloySelectOption key={index} value={area.value} className={"max-w-52 text-xs text-black dark:text-white"} >
                                            {area.label}
                                        </EmbloySelectOption>
                                    })}
                        </EmbloyInput>
                        {details.job_type !== job.job_type && 
                            <button className="hover:bg-primitivo/10 dark:hover:bg-primitivo/10 rounded-sm transition-colors duration-200" onClick={() => {setDetails({...details, "job_type": null})}}>
                                <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo" />
                            </button>
                        }
                    </EmbloyH>
                    <EmbloyH className={"gap-1.5 max-w-fit"}>
                        <EmbloyChildrenAdvanced html={true} tooltip={
                            <EmbloyV className="w-52 gap-1.5 p-2">
                                <EmbloyH className="gap-1.5 items-center">
                                    <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                    <EmbloyP className={"text-xs font-semibold underline"}>Location</EmbloyP> 
                                </EmbloyH>
                                <EmbloyP className={"max-w-52 italic text-xs"}>Heading of the Job Post. May differ from the Job Position e.g.</EmbloyP> 
                                <ul className="list-disc ml-4 max-w-52">
                                    <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Title: Lead Developer for iOS Team</EmbloyP></li>
                                    <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Position: Senior Software Engineer</EmbloyP></li>
                                </ul>
                            </EmbloyV>
                        }>
                            <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Location:</EmbloyP>
                        </EmbloyChildrenAdvanced>
                        {!locationStatus && <EmbloyH1Editable block={true} onBlur={() => {setLocationStatus(!locationStatus)}} className="text-xs font-normal w-36" initialText={location_text} placeholder="Add Location" onUpdate={(value) => {setDetails({...details, "title": value})}} />}
                        {locationStatus && 
                            <EmbloyH className="gap-4 items-center max-w-fit">
                                <EmbloyH className="gap-0.5 items-center max-w-fit">
                                    <input className="w-24 h-4 text-xs text-black dark:text-white" placeholder="City" value={location.city} onChange={(e) => setLocation({...location, "city": e.target.value})} />
                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                    <input className="w-24 h-4 text-xs text-black dark:text-white" placeholder="Address" value={location.address} onChange={(e) => setLocation({...location, "address": e.target.value})} />
                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                    <input className="w-24 h-4 text-xs text-black dark:text-white" placeholder="Postal Code" value={location.postal_code} onChange={(e) => setLocation({...location, "postal_code": e.target.value})} />
                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                    <EmbloyH className="max-w-28 gap-1.5">
                                        <EmbloyInput
                                            variant="select-light"
                                            onChange={(e) => setLocation({...location, "country_code": e.target.value})}
                                            value={location.country_code || ""}
                                            className={`w-52 text-xs ${(location.country_code && location.country_code !== "") ? "text-black dark:text-white" : "text-testaccio dark:text-nebbiolo"}`}
                                        >
                                            <EmbloySelectOption placeholder={true} className="text-xs text-black dark:text-white">
                                                Country
                                            </EmbloySelectOption>
                                            {country_codes.map((area, index) => {
                                                return <EmbloySelectOption key={index} value={area.value} className={"max-w-52 text-xs text-black dark:text-white"} >
                                                            {area.label}
                                                        </EmbloySelectOption>
                                                    })}
                                        </EmbloyInput>
                                        {location.country_code && 
                                            <button className="hover:bg-primitivo/10 dark:hover:bg-primitivo/10 rounded-sm transition-colors duration-200" onClick={() => {setLocation({...location, "country_code": null})}}>
                                                <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo" />
                                            </button>
                                        }
                                    </EmbloyH>
                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                </EmbloyH>
                                <button className="hover:bg-capri/10 dark:hover:bg-capri/10 rounded-md px-1 transition-colors duration-200" onClick={() => {setLocationStatus(!locationStatus)}}>
                                    <EmbloyP className="text-xs text-capri dark:text-capri">Save Location</EmbloyP>
                                </button>
                            </EmbloyH>
                        }
                    </EmbloyH>
                </EmbloyH>
            </EmbloyV>
        </EmbloyV>
    )   
}
