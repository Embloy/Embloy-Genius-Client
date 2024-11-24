import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import '@/app/globals.css'
import {AvatarButton} from "@/app/components/ui/misc/avatar";
import { not_core_get } from "@/lib/api/core";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloyRadioOption } from "@/app/components/ui/misc/input";
import { patch_user, set_avatar as post_avatar, remove_avatar } from "@/lib/api/user";
export function ProfileInfo(reload) {
    let user = useContext(UserContext)
    const [changesMade, setChangesMade] = useState(false);
    const [nameIsClicked, setNameIsClicked] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');



    const [newImageUrl, setNewImageUrl] = useState(null);
    const [avatar, set_avatar] = useState(false);

    const [showReload, setShowReload] = useState(false);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [removing, setRemoving] = useState(false);
    const [removeError, setRemoveError] = useState(null);
    const handleImageReset = async () => {
        try {
            setRemoveError(null);
            setRemoving(true);
            await remove_avatar();
            setNewImageUrl("default");
            setRemoving(false);
            setShowReload(true);
            set_avatar(false);
        } catch (error) {
            setRemoving(false);
            setRemoveError('error');
        }
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                if (file.size > 2000000) {
                    throw new Error('File too large');
                }
                setUploadError(null);
                setUploading(true);
                const result = await post_avatar(file);
                if (result.image_url) {
                    setNewImageUrl(result.image_url);
                }
                setUploading(false);
                setShowReload(true);
                set_avatar(true);

            } catch (error) {
                setUploading(false);
                setUploadError('error');
            }
        }
        
    };

    const handleFirstNameChange = async (e) => {
        if (user.first_name !== first_name) {
            const res = await patch_user({first_name: first_name});
            if (res.type === 'success') {
                user.first_name = first_name;
                set_first_name(first_name);
            } else {
                set_first_name(user.first_name);
            }
        }
    }
    const handleLastNameChange = async (e) => {
        if (user.last_name !== last_name) {
            const res = await patch_user({last_name: last_name});
            if (res.type === 'success') {
                user.last_name = last_name;
                set_last_name(last_name);
            } else {
                set_last_name(user.last_name);
            }
        } else {  }
    }

    const handleEmailChange = async (e) => {
        if (user.email !== email_address) {
            const res = await patch_user({email: email_address});
            if (res.type === 'success') {
                user.email = email_address;
                set_email_address(email_address);
            } else {
                set_email_address(user.email);
            }
        }
    }
    
   

    const resetChanges = () => {
        setFirstName('');
        setNameIsClicked(false);
        setLastName('');
        setEmail('');
        setEmailIsClicked(false);
        setChangesMade(false);
    }


    
    const [first_name, set_first_name] = useState(user.first_name);
    const [last_name, set_last_name] = useState(user.last_name);
    const [email_address, set_email_address] = useState(user.email);
    const fileInputRef = useRef(null);

    const handleAvatarChange = (value) => {
        if (value === 'initials') {
            handleImageReset();       
        } else if (value === 'image' && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    useEffect(() => {
        if (user.image_url===null) {
            set_avatar(false);
        } else {
            set_avatar(true);
        }
    }, [user]);

    return (  
        <EmbloyV className="gap-4" >
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Name" description="Your full name">
                    <EmbloyInput
                        name="First Name"
                        value={first_name}
                        required={true}
                        onChange={(e) => set_first_name(e.target.value)}
                        placeholder="First Name"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleFirstNameChange(e);
                            }
                        }}
                        onBlur={handleFirstNameChange}
                        />
                                    
                    <EmbloyInput
                        name="Last Name"
                        value={last_name}
                        required={true}
                        onChange={(e) => set_last_name(e.target.value)}
                        placeholder="Last Name"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleLastNameChange(e);
                            }
                        }}
                        onBlur={handleLastNameChange}
                    />
                </EmbloyInputboxElement>
            </EmbloyInputbox>
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Email">
                    <EmbloyInput
                        name="Email"
                        value={email_address}
                        required={true}
                        onChange={(e) => set_email_address(e.target.value)}
                        placeholder="Email Address"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleEmailChange(e);
                            }
                        }}
                        onBlur={handleEmailChange}
                        />
                </EmbloyInputboxElement>
            </EmbloyInputbox>
            <EmbloyInputbox>
            <EmbloyInputboxElement head="Avatar" description="Your public profile image">
                    <EmbloyH>
                        <EmbloyInput variant="single-choice">
                            <EmbloyRadioOption
                                value="initials"
                                head="Use initials"
                                checked={!avatar}
                                onChange={() => handleAvatarChange('initials')}
                                note = {removing ? 'Removing...' : removeError && 'Error removing'}
                                note_state = {removeError ? 'error' : 'default'}
                                
                            />
                            <EmbloyRadioOption
                                value="image"
                                head="Upload an image"
                                checked={avatar}
                                onChange={() => handleAvatarChange('image')}
                                note={uploading ? 'Uploading...' : uploadError && 'Error uploading'}
                                note_state={uploadError ? 'error' : 'default'}
                            />
                        </EmbloyInput>
                    </EmbloyH>

                    <EmbloyH className="justify-end" >
                        <EmbloyInput
                            variant="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }} 
                            onChange={handleImageChange} 
                        />

                            
                        <button onClick={() => {handleAvatarChange('image')}} >
                            <AvatarButton
                                updated_image={newImageUrl}
                                user={user}
                                w={80}
                                h={80}
                                styles="max-h-fit rounded-full bg-transparent hover:bg-transparent"
                                btn={false}
                            />
                        </button>
                        
                    </EmbloyH>
                </EmbloyInputboxElement>
            </EmbloyInputbox>
            <EmbloyInputbox>
                <EmbloyInputboxElement head="User ID" description="The unique identifier for your account. It cannot be modified." disabled={true}>
                    <EmbloyInput
                        name="UID"
                        disabled={true}
                        value={user.id}
                        required={true}
                        sandboxed={false}
                    />
                </EmbloyInputboxElement>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}