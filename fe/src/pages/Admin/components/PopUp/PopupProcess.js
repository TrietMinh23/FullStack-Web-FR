import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import RowData from "./rowData";
import { blockBuyer, unblockBuyer } from "../../../../api/buyer";
import PopUpSucess from "./PopUpSucess";
export default function PopupReview ({close, finish, i, data, at}) {
    const steps = ["Report Info", "Action","Informing" ];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn
    const [isBlockReporter, setBlockReporter] = useState(false);
    const [isBlockReported, setBlockReported] = useState(false);
    const [isOpenPopUp, setOpenPopUp] = useState(false);

    console.log(data[i].id_reporter)
    const closeProcess = () => {
        setOpenPopUp(false);
      };
    const handleBlockUserRow = async (item) => {
        try {
          setIsUpdating(true);
          await blockBuyer(item._id);
          // Handle success or update your local data accordingly
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter(
              (selectedItem) => selectedItem.tradeCode !== item.tradeCode
            )
          );
        } catch (error) {
          console.error("Error updating order status:", error.message);
          // Handle error or display an error message
        } finally {
          setIsUpdating(false);
        }
      };
    
      const handleUnblockUserRow = async (item) => {
        try {
          setIsUpdating(true);
          await unblockBuyer(item._id);
          // Handle success or update your local data accordingly
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter(
              (selectedItem) => selectedItem.tradeCode !== item.tradeCode
            )
          );
        } catch (error) {
          console.error("Error updating order status:", error.message);
          // Handle error or display an error message
        } finally {
          setIsUpdating(false);
        }
      };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const parts = new Date(date).toLocaleDateString(undefined, options).split(' ');
        return `${parts[1]} ${parts[0]}, ${parts[2]}`;
      }
    return (
        <div className="modal p-2" style={{ top: `calc(50% + ${at}px)` }}>
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
                        <div className = "flex grow">
                            <div className ="md:w-2/5" >People involved: </div>
                            <div
                                className="flex md:w-3/5" 
                            >   
                                <div>
                                    <span className ="text-blue-400	">{data[i].id_reporter.name}</span> 
                                    <span>  was reported  </span>
                                    <span className ="text-blue-400	">{data[i].id_reported.name}</span>
                                </div>
                            </div>
                        </div>
                        <RowData
                            titles ={"Post date"}
                            data = {formatDate(data[i].createdAt)}
                            css ={"mt-5"}
                        />
                        <RowData
                            titles ={"Title"}
                            data = {data[i].title}
                            css ={"mt-5"}
                        />
                        <RowData
                            titles ={"Content"}
                            data = {data[i].details}
                            css ={"mt-5"}
                        />
                    </div>
                }
                {currentStep === 2 &&
                    <div className="m-5 p-5 border rounded-md border-green-sheen">
                        <div className ="flex justify-between">
                            <div
                            className="p-2"
                            >Block: </div>
                            <button
                            className={` px-2 text-white font-semibold rounded-md  border-2 border-transparent ${isBlockReporter ? "bg-slate-200": "bg-orange-500 hover:border-2 hover:border-orange-500 hover:text-orange-500 hover:bg-white"}`}
                            disabled ={isBlockReporter}
                            onClick={() => {
                                handleBlockUserRow(data[i].id_reporter);
                                setBlockReporter(true);
                                setOpenPopUp(true);
                            }}
                            >Account Reporter</button>
                            <button
                            disabled ={isBlockReported}
                            className={` px-2 text-white font-semibold rounded-md  border-2 border-transparent ${isBlockReported ? "bg-slate-200": "bg-orange-500 hover:border-2 hover:border-orange-500 hover:text-orange-500 hover:bg-white"}`}
                            onClick={() => {
                                handleBlockUserRow(data[i].id_reported);
                                setBlockReported(true);
                                setOpenPopUp(true);
                            }}
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
            {isOpenPopUp && (
                <div className="flex lg:flex-row flex-col">
                <PopUpSucess
                    close={closeProcess}
                    at={document.documentElement.scrollTop}
                />
                <div id="dimScreen" className={"block"}></div>
                </div>
            )}
        </div>
    )
}