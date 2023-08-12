import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import {data} from "../../data/dataReport";

export default function PopupReview ({close, finish, i}) {
    const steps = ["Report Info", "Action","Informing" ];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const parts = new Date(date).toLocaleDateString(undefined, options).split(' ');
        return `${parts[1]} ${parts[0]}, ${parts[2]}`;
      }
    return (
        <div className ="container popUpBigModal ">
            <div className ="model-wrapper p-10">
                {complete &&
                    <div className="mb-16 rounded-md ">
                        <h1 className ="text-xl	font-semibold text-center">Successful report processing</h1>
                        <div className ="text-center ">
                        </div>
                    </div>
                }
                <div className="flex justify-between">
                    {steps?.map((step, i) => (
                        <>
                            <div
                                key={i}
                                className={`relative flex flex-col justify-center items-center w-36 `}
                            >
                                <div className={`w-12 h-12 flex items-center justify-center z-10 relative  rounded-full font-semibold text-white
                                ${currentStep === i + 1  && !complete ? "bg-sky-600" : ( i + 1 < currentStep || complete?"bg-green-600" : "bg-slate-200")}
                                `}>
                                    {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                                </div>

                                { i !== 0 &&
                                <div className ={`content-['']  absolute w-full h-[3px] right-2/3 top-1/3 -translate-y-2/4 
                                ${currentStep > i ? "bg-green-600" : "bg-slate-200"}
                                `}>

                                </div>
                                }
                                <p className="text-gray-500">{step}</p>
                            </div>
                        </>
                    ))}
                </div>
                {currentStep === 1 &&
                    <div className="m-5 p-5 border rounded-md border-green-sheen">
                        <div className = "flex">
                            <div>People involved: </div>
                            <div
                                className="flex justify-center w-1/2 ml-1" 
                            >   
                                <div>
                                    <span className ="text-blue-400	">{data[i].id_reporter.name}</span> 
                                    <span>  was reported  </span>
                                    <span className ="text-blue-400	">{data[i].id_reported.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className = "flex mt-5">
                            <div>Post date: </div>
                            <div className ="ml-16 pl-2" 
                            >{formatDate(data[i].createdAt)}</div>
                        </div>
                        <div className = "flex mt-5 ">
                            <div>Title: </div>
                            <div className="ml-24 pl-3 ">{data[i].title}</div>
                        </div>
                        <div className = "flex mt-5">
                            <div>Content: </div>
                            <div className="ml-20 ">{data[i].details}</div>
                        </div>
                    </div>
                }
                {currentStep === 2 &&
                    <div className="m-5 p-5 border rounded-md border-green-sheen">
                        <div className ="flex justify-between">
                            <div
                            className="p-2"
                            >Block: </div>
                            <button
                            className="bg-orange-500 px-2 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                            >Account Reporter</button>
                            <button
                            className="bg-orange-500 px-2 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                            >Account Reported</button>
                        </div>
                        <div className ="flex justify-between my-5">
                            <div
                            className="p-2"
                            >Delete: </div>
                            <button
                            className="px-2 bg-red-500 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                            >Account Reporter</button>
                            <button
                            className="px-2 bg-red-500 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                            >Account Reported</button>
                        </div>
                    </div>
                }
                {currentStep === 3 && !complete &&
                    <div className="m-5 p-5 border rounded-md border-green-sheen">
                        <div className ="flex justify-between my-5">
                            <div>Send email to </div>
                            <button
                            className="p-1 bg-yellow-500 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-yellow-500 hover:text-yellow-500"
                            >Reporter</button>
                            <button
                            className="p-1 bg-yellow-500 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-yellow-500 hover:text-yellow-500"
                            >Reported</button>
                        </div>
                    </div>
                }
                
                <div className ={`my-10 flex ${complete ? "justify-end": "justify-between"}`}>
                    {!complete ?
                        <>
                            <button
                                className="bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                                onClick = {() => {
                                    currentStep !== 1 ?
                                    setCurrentStep(currentStep - 1) 
                                    :
                                    close()
                                }}
                            >
                                {currentStep === 1 ? "Cancel" : "Previous"}
                            </button>
                            <button
                                className ="ml-4 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                                onClick={() => {
                                    currentStep === steps.length
                                    ? setComplete(true)
                                    : setCurrentStep((prev) => prev + 1);
                                }}
                                >
                                {currentStep === steps.length ? "Finish" : "Next"}
                                </button>
                        </>
                        :
                        <button
                        className ="ml-4 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                        onClick={finish}
                        >
                        Return to report page
                        </button>
                    }
                </div>
            
            </div>
        </div>
    )
}