"use client";
import React, {Fragment, useEffect, useMemo, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {Draggable, DropArg} from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import {Dialog, Transition} from '@headlessui/react'
import {CheckIcon, ExclamationTriangleIcon} from '@heroicons/react/20/solid'
import {EventSourceInput} from '@fullcalendar/core/index.js'
import useSWR from 'swr'
import Image from "next/image";
import Logo from "@/app/components/navigation/navbar/Logo";
import LoadingScreen from "@/app/components/misc/LoadingScreen";

const fetcher = (args) => fetch(args).then((res) => res.json())
export default function Calendar() {


    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentHour = String(currentDate.getHours()).padStart(2, '0');
    const currentMinute = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}T${currentHour}:${currentMinute}`;


    const [events, setShowEvents] = useState([
        {title: 'event 1', id: '1', start: '2023-08-29 06:16:28', end: '2023-08-29 16:00:00'},
        {title: 'event 2', id: '2', start: '2023-08-30 06:16:28', end: '2023-08-30 16:00:00'},
        {title: 'event 3', id: '3', start: '2023-08-31 06:16:28', end: '2023-08-31 16:00:00'},
        {title: 'event 4', id: '4', start: '2023-09-01 06:16:28', end: '2023-09-01 16:00:00'},
        {title: 'event 5', id: '5', start: '2023-09-02 06:16:28', end: '2023-09-02 16:00:00'},
    ])

    const [allEvents, setAllEvents] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        id: 0,
    })
    const [showEventModal, setShowEventModal] = useState(false)
    const [showEvent, setShowEvent] = useState({
        title: '',
        start: '',
        end: '',
        id: 0,
    })


    function handleDateClick(arg) {
        const clickDate = arg.dateStr
        const formattedClickDate = `${clickDate}T${currentHour}:${currentMinute}`;
        const clickDateObject = new Date(formattedClickDate);

// Calculate two hours after the click date
        const twoHoursAfterClickDate = new Date(clickDateObject);
        twoHoursAfterClickDate.setHours(clickDateObject.getHours() + 2);

// Check if we've crossed midnight
        if (twoHoursAfterClickDate.getDate() !== clickDateObject.getDate()) {
            // Adjust the date to the next day
            twoHoursAfterClickDate.setDate(clickDateObject.getDate() + 1);
        }

// Format the result into the desired string format
        const currentYear2 = twoHoursAfterClickDate.getFullYear();
        const currentMonth2 = String(twoHoursAfterClickDate.getMonth() + 1).padStart(2, '0');
        const currentDay2 = String(twoHoursAfterClickDate.getDate()).padStart(2, '0');
        const currentHour2 = String(twoHoursAfterClickDate.getHours()).padStart(2, '0');
        const currentMinute2 = String(twoHoursAfterClickDate.getMinutes()).padStart(2, '0');
        const formattedTwoHoursAfterClickDate = `${currentYear2}-${currentMonth2}-${currentDay2}T${currentHour2}:${currentMinute2}`;

        setNewEvent({
            ...newEvent,
            start: formattedClickDate,
            end: formattedTwoHoursAfterClickDate,
            id: new Date().getTime()
        })
        setShowModal(true)
    }

    function addEvent(data) {
        const event = {
            ...newEvent,
            start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            id: new Date().getTime()
        }
        setAllEvents([...allEvents, event])
    }

    function handleDeleteModal(data) {
        setShowDeleteModal(true)
        setIdToDelete(Number(data.event.id))
    }

    function formatDateTime(data) {
        const binDate = new Date(data);
        const binYear = binDate.getFullYear();
        const binMonth = String(binDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const binDay = String(binDate.getDate()).padStart(2, '0');
        const binHour = String(binDate.getHours()).padStart(2, '0');
        const binMinute = String(binDate.getMinutes()).padStart(2, '0');
        return (`${binYear}-${binMonth}-${binDay}T${binHour}:${binMinute}`);
    }

    function handleEventModal(data) {
        const bin = data.event
        setShowEvent({
            id: Number(bin.id),
            title: bin.title,
            start: formatDateTime(bin.start),
            end: formatDateTime(bin.end)

        })
        setShowEventModal(true)


        //setIdToDelete(Number(data.event.id))
    }

    function handleDelete() {
        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDeleteModal(false)
        setIdToDelete(null)
    }

    function handleCloseModal() {
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            id: 0
        })
        setShowDeleteModal(false)
        setIdToDelete(null)
        setShowEventModal(false)
        setShowEvent({
            title: '',
            start: '',
            end: '',
            id: 0,
        })
    }

    const handleChange = (e) => {
        // populates event object (generically from all inputs)
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setNewEvent({
            ...newEvent,
            [name]: value,
        })
    }

    const handleEventChange = (e) => {
        // populates event object (generically from all inputs)
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setShowEvent({
            ...showEvent,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setAllEvents([...allEvents, newEvent])
        setShowModal(false) // schließt dialog fenster
        setNewEvent({
            title: '',
            start: '',
            id: 0
        })
    }

    function handleEdit(e) {
        e.preventDefault()
        //logic
        setShowEventModal(false)

        setShowEvent({
            title: '',
            start: '',
            end: '',
            id: 0,
        })
    }

    useEffect(() => {

        let draggableEl = document.getElementById('draggable-el')
        if (draggableEl) {

            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title")
                    let id = eventEl.getAttribute("data")
                    let start = eventEl.getAttribute("start")
                    return {title, id, start}
                }
            })


        }
    }, [])


    const {data, error} = useSWR('http://192.168.178.126:8000/api/v0/assignment/?user_id=77', fetcher)


    const bin = () => {
        let assignments = [];
        for (const key in data) {
            assignments.push({
                title: `assignment ${key}`,
                id: data[key].job_id,
                start: data[key].start,
                end: data[key].end,
            });
        }
        return assignments;
    };


    useEffect(() => {
        const initialAssignments = bin();
        setAllEvents(initialAssignments);
    }, []);

    if (!data) {
        return <LoadingScreen/>;
    }

    // account for initial problems
    if (allEvents.length === 0) {
        let counter = 0;
        while (allEvents.length === 0 && counter < 5) {
            setAllEvents(bin());
            counter = counter + 1;
        }

        if (allEvents.length === 0) {
            return <LoadingScreen/>;
        }
    }


    return (
        <>
            <nav className="flex justify-between mb-12 border-b border-gray-700 p-4">
                <h1 className="font-bold text-2x1 text-white">My schedule</h1>
            </nav>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="grid grid-cols-10">
                    <div className="col-span-8 bg-white">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                interactionPlugin,
                                timeGridPlugin
                            ]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'resourceTimelineWook, dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            events={allEvents}
                            nowIndicator={true}
                            editable={true}
                            droppable={true}
                            selectable={true}
                            selectMirror={true}
                            dateClick={handleDateClick}
                            drop={(data) => addEvent(data)}
                            eventClick={(data) => handleEventModal(data)}
                        />
                    </div>
                    <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
                        <h1 className="font-bold text-lg text-center">Drag Event</h1>
                        {events.map(event => (
                            <div
                                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                                title={event.title}
                                key={event.id}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
                <Transition.Root show={showDeleteModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"

                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                                    >
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600"
                                                                             aria-hidden="true"/>
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3"
                                                                  className="text-base font-semibold leading-6 text-gray-900">
                                                        Delete Event
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Are you sure you want to delete this event?
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleDelete}>
                                                Delete
                                            </button>
                                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={handleCloseModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                <Transition.Root show={showModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setShowModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel
                                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <div>
                                            <div
                                                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                    Add Event
                                                </Dialog.Title>
                                                <form action="submit" onSubmit={handleSubmit}>
                                                    <div className="mt-2">
                                                        <input type="text" name="title"
                                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                                               value={newEvent.title} onChange={(e) => handleChange(e)}
                                                               placeholder="Title"/>
                                                    </div>
                                                    <div className="mt-2">
                                                        <input type="datetime-local" name="start"
                                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                                               value={newEvent.start}
                                                               onChange={(e) => handleChange(e)}/>
                                                    </div>
                                                    <div className="mt-2">
                                                        <input type="datetime-local" name="end"
                                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                                               value={newEvent.end} onChange={(e) => handleChange(e)}/>
                                                    </div>
                                                    <div
                                                        className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                                                            disabled={newEvent.title === ''}
                                                        >
                                                            Create
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                            onClick={handleCloseModal}

                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                <Transition.Root show={showEventModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setShowEventModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel
                                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <div>
                                            <div
                                                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                    {showEvent.title}
                                                </Dialog.Title>
                                                <form action="submit" onSubmit={handleEdit}>
                                                    <div className="mt-2">
                                                        <input type="datetime-local" name="start"
                                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                                               value={showEvent.start}
                                                               onChange={(e) => handleEventChange(e)}/>
                                                    </div>
                                                    <div className="mt-2">
                                                        <input type="datetime-local" name="end"
                                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                                               value={showEvent.end}
                                                               onChange={(e) => handleEventChange(e)}/>
                                                    </div>
                                                    <div
                                                        className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                                                            disabled={showEvent.title === '' || showEvent.start === '' || showEvent.end === ''}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                            onClick={handleCloseModal}

                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

            </main>
            <div>
                <p>This is a content to make our page longer</p>
                <div className="w-full h-screen"></div>
                <p>
                    Lorem Ipsum is simply dummy text ...
                </p>
            </div>
        </>
    );
}

/*
                <Transition.Root show={showModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setShowModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <div>
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Add Event
                                                </Dialog.Title>
                                                <form action="submit" onSubmit={handleSubmit}>
                                                    <div className="mt-2">
                                                        <input type="text" name="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                            focus:ring-2
                            focus:ring-inset focus:ring-violet-600
                            sm:text-sm sm:leading-6"
                                                               value={newEvent.title} onChange={(e) => handleChange(e)} placeholder="Title" />
                                                    </div>
                                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                                                            disabled={newEvent.title === ''}
                                                        >
                                                            Create
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                            onClick={handleCloseModal}

                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

 */
