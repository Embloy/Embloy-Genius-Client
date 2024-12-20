"use client";
import React, { useEffect, useState, useContext, useRef} from "react";
import { EmbloyH1Editable, EmbloyP, EmbloyH1 } from "@/app/components/ui/misc/text"
import { EmbloyChildrenAdvanced, EmbloyH, EmbloyV } from "@/app/components/ui/misc/stuff";
import { XIcon } from "lucide-react";
import { applicationColumns } from "@/app/recruitment/application_columns";
import { ApplicationDataTable } from "@/app/recruitment/ApplicationDataTable";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { EmbloyInput, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { not_core_get } from "@/lib/api/core";

export const JobDetails2 = ({job, handleDataReload, onChange, editable}) => {
    const [details, setDetails] = useState(job);
    const [locationStatus, setLocationStatus] = useState(false);
    const [location, setLocation] = useState({city: job.city, address: job.address, postal_code: job.postal_code, country_code: job.country_code});
    const location_not_null = location.city || location.address || location.postal_code || location.country_code;
    useEffect(() => {
        if (location.country_code === "XX") {
            setLocation({...location, "city": null, "address": null, "postal_code": null});
        }
    }, [location.country_code]);

    const handle_change = (e, field) => {
        setDetails({...details, [field]: e.target.value});
    }

    const location_text = () => {
        let string = "";
        if (location.address && location.address !== "") {
            string += location.address + ", ";
        }
        if (location.postal_code && location.postal_code !== "") {
            string += location.postal_code + ", ";
        }
        if (location.city && location.city !== "") {
            string += location.city + ", ";
        }
        if (location.country_code && location.country_code !== "") {
            if (location.country_code === "XX") {
                string += "Remote";
            } else {
                string += location.country_code;
            }
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
        //console.log("DETAILS", details.job_type)
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
        {value: "Manufacturing", label: "Manufacturing"},
        {value: "Administration", label: "Administration"},
        {value: "Management", label: "Management"},
        {value: "Back_Office", label: "Back Office"},
        {value: "Front_Office", label: "Front Office"},
        {value: "Executive", label: "Executive"},
    ];

    const country_codes = [
        {value: "XX", label: "Remote"},
        {value: "AF", label: "Afghanistan"},
        {value: "AL", label: "Albania"},
        {value: "DZ", label: "Algeria"},
        {value: "AS", label: "American Samoa"},
        {value: "AD", label: "Andorra"},
        {value: "AO", label: "Angola"},
        {value: "AI", label: "Anguilla"},
        {value: "AQ", label: "Antarctica"},
        {value: "AG", label: "Antigua and Barbuda"},
        {value: "AR", label: "Argentina"},
        {value: "AM", label: "Armenia"},
        {value: "AW", label: "Aruba"},
        {value: "AU", label: "Australia"},
        {value: "AT", label: "Austria"},
        {value: "AZ", label: "Azerbaijan"},
        {value: "BS", label: "Bahamas"},
        {value: "BH", label: "Bahrain"},
        {value: "BD", label: "Bangladesh"},
        {value: "BB", label: "Barbados"},
        {value: "BY", label: "Belarus"},
        {value: "BE", label: "Belgium"},
        {value: "BZ", label: "Belize"},
        {value: "BJ", label: "Benin"},
        {value: "BM", label: "Bermuda"},
        {value: "BT", label: "Bhutan"},
        {value: "BO", label: "Bolivia"},
        {value: "BQ", label: "Bonaire, Sint Eustatius and Saba"},
        {value: "BA", label: "Bosnia and Herzegovina"},
        {value: "BW", label: "Botswana"},
        {value: "BV", label: "Bouvet Island"},
        {value: "BR", label: "Brazil"},
        {value: "IO", label: "British Indian Ocean Territory"},
        {value: "VG", label: "British Virgin Islands"},
        {value: "BN", label: "Brunei Darussalam"},
        {value: "BG", label: "Bulgaria"},
        {value: "BF", label: "Burkina Faso"},
        {value: "BI", label: "Burundi"},
        {value: "CV", label: "Cabo Verde"},
        {value: "KH", label: "Cambodia"},
        {value: "CM", label: "Cameroon"},
        {value: "CA", label: "Canada"},
        {value: "KY", label: "Cayman Islands"},
        {value: "CF", label: "Central African Republic"},
        {value: "TD", label: "Chad"},
        {value: "CL", label: "Chile"},
        {value: "CN", label: "China"},
        {value: "CX", label: "Christmas Island"},
        {value: "CC", label: "Cocos (Keeling) Islands"},
        {value: "CO", label: "Colombia"},
        {value: "KM", label: "Comoros"},
        {value: "CG", label: "Congo"},
        {value: "CD", label: "Congo (Democratic Republic)"},
        {value: "CK", label: "Cook Islands"},
        {value: "CR", label: "Costa Rica"},
        {value: "HR", label: "Croatia"},
        {value: "CU", label: "Cuba"},
        {value: "CW", label: "Curaçao"},
        {value: "CY", label: "Cyprus"},
        {value: "CZ", label: "Czechia"},
        {value: "CI", label: "Côte d'Ivoire"},
        {value: "DK", label: "Denmark"},
        {value: "DJ", label: "Djibouti"},
        {value: "DM", label: "Dominica"},
        {value: "DO", label: "Dominican Republic"},
        {value: "EC", label: "Ecuador"},
        {value: "EG", label: "Egypt"},
        {value: "SV", label: "El Salvador"},
        {value: "GQ", label: "Equatorial Guinea"},
        {value: "ER", label: "Eritrea"},
        {value: "EE", label: "Estonia"},
        {value: "SZ", label: "Eswatini"},
        {value: "ET", label: "Ethiopia"},
        {value: "FK", label: "Falkland Islands"},
        {value: "FO", label: "Faroe Islands"},
        {value: "FJ", label: "Fiji"},
        {value: "FI", label: "Finland"},
        {value: "FR", label: "France"},
        {value: "GF", label: "French Guiana"},
        {value: "PF", label: "French Polynesia"},
        {value: "TF", label: "French Southern Territories"},
        {value: "GA", label: "Gabon"},
        {value: "GM", label: "Gambia"},
        {value: "GE", label: "Georgia"},
        {value: "DE", label: "Germany"},
        {value: "GH", label: "Ghana"},
        {value: "GI", label: "Gibraltar"},
        {value: "GR", label: "Greece"},
        {value: "GL", label: "Greenland"},
        {value: "GD", label: "Grenada"},
        {value: "GP", label: "Guadeloupe"},
        {value: "GU", label: "Guam"},
        {value: "GT", label: "Guatemala"},
        {value: "GG", label: "Guernsey"},
        {value: "GN", label: "Guinea"},
        {value: "GW", label: "Guinea-Bissau"},
        {value: "GY", label: "Guyana"},
        {value: "HT", label: "Haiti"},
        {value: "HM", label: "Heard and McDonald Islands"},
        {value: "HN", label: "Honduras"},
        {value: "HK", label: "Hong Kong"},
        {value: "HU", label: "Hungary"},
        {value: "IS", label: "Iceland"},
        {value: "IN", label: "India"},
        {value: "ID", label: "Indonesia"},
        {value: "IR", label: "Iran"},
        {value: "IQ", label: "Iraq"},
        {value: "IE", label: "Ireland"},
        {value: "IM", label: "Isle of Man"},
        {value: "IL", label: "Israel"},
        {value: "IT", label: "Italy"},
        {value: "JM", label: "Jamaica"},
        {value: "JP", label: "Japan"},
        {value: "JE", label: "Jersey"},
        {value: "JO", label: "Jordan"},
        {value: "KZ", label: "Kazakhstan"},
        {value: "KE", label: "Kenya"},
        {value: "KI", label: "Kiribati"},
        {value: "KW", label: "Kuwait"},
        {value: "KG", label: "Kyrgyzstan"},
        {value: "LA", label: "Laos"},
        {value: "LV", label: "Latvia"},
        {value: "LB", label: "Lebanon"},
        {value: "LS", label: "Lesotho"},
        {value: "LR", label: "Liberia"},
        {value: "LY", label: "Libya"},
        {value: "LI", label: "Liechtenstein"},
        {value: "LT", label: "Lithuania"},
        {value: "LU", label: "Luxembourg"},
        {value: "MO", label: "Macao"},
        {value: "MG", label: "Madagascar"},
        {value: "MW", label: "Malawi"},
        {value: "MY", label: "Malaysia"},
        {value: "MV", label: "Maldives"},
        {value: "ML", label: "Mali"},
        {value: "MT", label: "Malta"},
        {value: "MH", label: "Marshall Islands"},
        {value: "MQ", label: "Martinique"},
        {value: "MR", label: "Mauritania"},
        {value: "MU", label: "Mauritius"},
        {value: "YT", label: "Mayotte"},
        {value: "MX", label: "Mexico"},
        {value: "FM", label: "Micronesia"},
        {value: "MD", label: "Moldova"},
        {value: "MC", label: "Monaco"},
        {value: "MN", label: "Mongolia"},
        {value: "ME", label: "Montenegro"},
        {value: "MS", label: "Montserrat"},
        {value: "MA", label: "Morocco"},
        {value: "MZ", label: "Mozambique"},
        {value: "MM", label: "Myanmar"},
        {value: "NA", label: "Namibia"},
        {value: "NR", label: "Nauru"},
        {value: "NP", label: "Nepal"},
        {value: "NL", label: "Netherlands"},
        {value: "NC", label: "New Caledonia"},
        {value: "NZ", label: "New Zealand"},
        {value: "NI", label: "Nicaragua"},
        {value: "NE", label: "Niger"},
        {value: "NG", label: "Nigeria"},
        {value: "NU", label: "Niue"},
        {value: "NF", label: "Norfolk Island"},
        {value: "KP", label: "North Korea"},
        {value: "MK", label: "North Macedonia"},
        {value: "MP", label: "Northern Mariana Islands"},
        {value: "NO", label: "Norway"},
        {value: "OM", label: "Oman"},
        {value: "PK", label: "Pakistan"},
        {value: "PW", label: "Palau"},
        {value: "PS", label: "Palestine"},
        {value: "PA", label: "Panama"},
        {value: "PG", label: "Papua New Guinea"},
        {value: "PY", label: "Paraguay"},
        {value: "PE", label: "Peru"},
        {value: "PH", label: "Philippines"},
        {value: "PN", label: "Pitcairn"},
        {value: "PL", label: "Poland"},
        {value: "PT", label: "Portugal"},
        {value: "PR", label: "Puerto Rico"},
        {value: "QA", label: "Qatar"},
        {value: "RO", label: "Romania"},
        {value: "RU", label: "Russia"},
        {value: "RW", label: "Rwanda"},
        {value: "RE", label: "Réunion"},
        {value: "BL", label: "Saint Barthélemy"},
        {value: "SH", label: "Saint Helena"},
        {value: "KN", label: "Saint Kitts and Nevis"},
        {value: "LC", label: "Saint Lucia"},
        {value: "MF", label: "Saint Martin"},
        {value: "PM", label: "Saint Pierre and Miquelon"},
        {value: "VC", label: "Saint Vincent and the Grenadines"},
        {value: "WS", label: "Samoa"},
        {value: "SM", label: "San Marino"},
        {value: "ST", label: "Sao Tome and Principe"},
        {value: "SA", label: "Saudi Arabia"},
        {value: "SN", label: "Senegal"},
        {value: "RS", label: "Serbia"},
        {value: "SC", label: "Seychelles"},
        {value: "SL", label: "Sierra Leone"},
        {value: "SG", label: "Singapore"},
        {value: "SX", label: "Sint Maarten"},
        {value: "SK", label: "Slovakia"},
        {value: "SI", label: "Slovenia"},
        {value: "SB", label: "Solomon Islands"},
        {value: "SO", label: "Somalia"},
        {value: "ZA", label: "South Africa"},
        {value: "KR", label: "South Korea"},
        {value: "SS", label: "South Sudan"},
        {value: "ES", label: "Spain"},
        {value: "LK", label: "Sri Lanka"},
        {value: "SD", label: "Sudan"},
        {value: "SR", label: "Suriname"},
        {value: "SJ", label: "Svalbard and Jan Mayen"},
        {value: "SE", label: "Sweden"},
        {value: "CH", label: "Switzerland"},
        {value: "SY", label: "Syria"},
        {value: "TW", label: "Taiwan"},
        {value: "TJ", label: "Tajikistan"},
        {value: "TZ", label: "Tanzania"},
        {value: "TH", label: "Thailand"},
        {value: "TL", label: "Timor-Leste"},
        {value: "TG", label: "Togo"},
        {value: "TK", label: "Tokelau"},
        {value: "TO", label: "Tonga"},
        {value: "TT", label: "Trinidad and Tobago"},
        {value: "TN", label: "Tunisia"},
        {value: "TR", label: "Turkey"},
        {value: "TM", label: "Turkmenistan"},
        {value: "TC", label: "Turks and Caicos Islands"},
        {value: "TV", label: "Tuvalu"},
        {value: "VI", label: "U.S. Virgin Islands"},
        {value: "UG", label: "Uganda"},
        {value: "UA", label: "Ukraine"},
        {value: "AE", label: "United Arab Emirates"},
        {value: "GB", label: "United Kingdom"},
        {value: "US", label: "United States"},
        {value: "UM", label: "United States Minor Outlying Islands"},
        {value: "UY", label: "Uruguay"},
        {value: "UZ", label: "Uzbekistan"},
        {value: "VU", label: "Vanuatu"},
        {value: "VA", label: "Vatican City"},
        {value: "VE", label: "Venezuela"},
        {value: "VN", label: "Vietnam"},
        {value: "WF", label: "Wallis and Futuna"},
        {value: "EH", label: "Western Sahara"},
        {value: "YE", label: "Yemen"},
        {value: "ZM", label: "Zambia"},
        {value: "ZW", label: "Zimbabwe"},
        {value: "AX", label: "Åland Islands"}
    ]; 


    const handleSave = async (key, value) => {
        //console.log("KEY", key, "VALUE", value, value === null)
        if (key !== null && key !== undefined && key.trim() !== "" && job[key] !== undefined && value !== undefined && value !== details[key]) {
            try {
                //console.log("MAGAKING", value, details[key])
                await not_core_get("PATCH", `/jobs/${job.id}`, {[key]: value});
                handleDataReload();
                setDetails({...details, [key]: value});
            } catch (e) {
                setDetails({...details, [key]: job[key]});
                //console.log("DOUBT")
            }
        } else {
            //console.log("NOPE")
        }
    }

    const handleLocationSave = async () => {
        if (location.city !== details.city) {
            try {
                //console.log("PATCHING CITY", location.city)
                await not_core_get("PATCH", `/jobs/${job.id}`, {"city": location.city});
                handleDataReload();
                setDetails({...details, "city": location.city});
            } catch (e) {
                //console.log("ERROR CITY", e)
                setDetails({...details, "city": job.city});
                setLocation({...location, "city": job.city});
            }
        }

        if (location.address !== details.address) {
            try {
                //console.log("PATCHING ADDRESS", location.address)
                await not_core_get("PATCH", `/jobs/${job.id}`, {"address": location.address});
                handleDataReload();
                setDetails({...details, "address": location.address});
            } catch (e) {
                //console.log("ERROR ADDRESS", e)
                setDetails({...details, "address": job.address});
                setLocation({...location, "address": job.address});
            }
        }

        if (location.postal_code !== details.postal_code) {
            try {
                //console.log("PATCHING POSTAL CODE", location.postal_code)
                await not_core_get("PATCH", `/jobs/${job.id}`, {"postal_code": location.postal_code});
                handleDataReload();
                setDetails({...details, "postal_code": location.postal_code});
            } catch (e) {
                //console.log("ERROR POSTAL CODE", e)
                setDetails({...details, "postal_code": job.postal_code});
                setLocation({...location, "postal_code": job.postal_code});
            }
        }
        if (location.country_code !== details.country_code) {
            try {
                //console.log("PATCHING COUNTRY CODE", location.country_code)
                await not_core_get("PATCH", `/jobs/${job.id}`, {"country_code": location.country_code});
                handleDataReload();
                setDetails({...details, "country_code": location.country_code});
            } catch (e) {
                //console.log("ERROR COUNTRY CODE", e)
                setDetails({...details, "country_code": job.country_code});
                setLocation({...location, "country_code": job.country_code});
            }
        }
        setLocationStatus(false);
        
    }
    
    return (
        <EmbloyV>
            <EmbloyH className={"justify-start"}>
                <EmbloyH1 className="text-sm">Details</EmbloyH1>
            </EmbloyH>
            <EmbloyV className="border border-etna dark:border-nebbiolo p-1.5 gap-px rounded-md ">
                <EmbloyH className={"gap-2"}>
                    { (editable || (!editable && job.position && job.position !== "")) &&
                        <EmbloyH className={"gap-1.5 max-w-fit"}>
                            <EmbloyChildrenAdvanced html={true} tooltip={
                                <EmbloyV className="w-52 gap-1.5 p-2">
                                    <EmbloyH className="gap-1.5 items-center">
                                        <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                        <EmbloyP className={"text-xs font-semibold underline"}>Job Position</EmbloyP> 
                                    </EmbloyH>
                                    <EmbloyP className={"max-w-52 italic text-xs"}>Level of the Job. May differ from the Job Title e.g.</EmbloyP> 
                                    <ul className="list-disc ml-4 max-w-52">
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Title: Lead Developer for iOS Team</EmbloyP></li>
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Position: Senior Software Engineer</EmbloyP></li>
                                    </ul>
                                </EmbloyV>
                            }>
                                <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Position:</EmbloyP>
                            </EmbloyChildrenAdvanced>
                            {editable ? 
                                <EmbloyH1Editable className="text-xs font-normal w-36" maxLength="100" initialText={details.position !== null ? details.position : ""} placeholder="Job Position" onUpdate={(value) => {
                                    handleSave("position", value)
                                }} keydown={(e) => {handleSave("position", e)}} /> 
                                : 
                                <EmbloyH1 className="text-xs font-normal max-w-fit">{details.position}</EmbloyH1>
                            }
                    </EmbloyH>
                    }
                    { (editable || (!editable && job.job_type && job.job_type !== "")) &&
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
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Back Office</EmbloyP></li>
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Gaming & Entertainment</EmbloyP></li>
                                    </ul>
                                </EmbloyV>
                            }>
                                <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Area:</EmbloyP>
                            </EmbloyChildrenAdvanced>
                            { editable ?
                                <>
                                    <EmbloyInput
                                        variant="select-light"
                                        onChange={(e) => handleSave("job_type", e.target.value)}
                                        value={details.job_type !== null ? details.job_type : ""}
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
                                    {details.job_type !== null && 
                                        <button className="hover:bg-primitivo/10 dark:hover:bg-primitivo/10 rounded-sm transition-colors duration-200" onClick={() => {handleSave("job_type", null)}}>
                                            <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo" />
                                        </button>
                                    }
                                </>
                                :
                                <EmbloyH1 className="text-xs font-normal max-w-fit">{areas.find(area => area.value === details.job_type).label}</EmbloyH1>
                            }
                        </EmbloyH>
                    }
                    { (editable || (!editable && location_not_null)) &&
                        <EmbloyH className={"gap-1.5"}>
                            <EmbloyChildrenAdvanced html={true} tooltip={
                                <EmbloyV className="w-52 gap-1.5 p-2">
                                    <EmbloyH className="gap-1.5 items-center">
                                        <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                        <EmbloyP className={"text-xs font-semibold underline"}>Job Location</EmbloyP> 
                                    </EmbloyH>
                                    <EmbloyP className={"max-w-52 italic text-xs"}>Geographical location of the Job Position. Remote, Hybrid, or On-Site options available.</EmbloyP> 
                                </EmbloyV>
                            }>
                                <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Location:</EmbloyP>
                            </EmbloyChildrenAdvanced>
                                { editable ?
                                    <>
                                        {!locationStatus && <EmbloyH1Editable block={true} onClick={() => {setLocationStatus(!locationStatus)}} className="text-xs font-normal" initialText={location_text || ""} placeholder="Add Location" onUpdate={() => {}} />}
                                        {locationStatus && 
                                            <EmbloyH className="gap-4 justify-between items-center w-full">
                                                <EmbloyH className="gap-0.5 items-center max-w-fit">
                                                    <input maxLength="150" className="w-24 h-4 text-xs text-black dark:text-white" placeholder="Address" value={location.address || ""} onChange={(e) => setLocation({...location, "address": e.target.value})} />
                                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                                    <input maxLength="45" className="w-24 h-4 text-xs text-black dark:text-white" placeholder="Postal Code" value={location.postal_code || ""} onChange={(e) => setLocation({...location, "postal_code": e.target.value})} />
                                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                                    <input maxLength="45" className="w-24 h-4 text-xs text-black dark:text-white" placeholder="City" value={location.city || ""} onChange={(e) => setLocation({...location, "city": e.target.value})} />
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
                                                <button className="hover:bg-capri/10 dark:hover:bg-capri/10 rounded-md px-1 transition-colors duration-200" onClick={() => {handleLocationSave()}}>
                                                    <EmbloyP className="text-xs text-capri dark:text-capri">Save Location</EmbloyP>
                                                </button>
                                            </EmbloyH>
                                        }
                                    </>
                                    :
                                    <EmbloyH1 className="text-xs font-normal max-w-fit">{location_text()}</EmbloyH1>
                                }
                        </EmbloyH>
                    }
                </EmbloyH>
            </EmbloyV>
        </EmbloyV>
    )   
}
