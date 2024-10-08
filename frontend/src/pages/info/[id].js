import PersonalInfo from "../../components/homepage/id_card/personal_info";
import ProfilePic from "../../components/homepage/id_card/profile_pic";
import Loading from "../../components/loading";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Image from "next/image";
import EnableId from "../../../public/images/enable_id_logo.svg";
import download from "../../../public/images/id_card/download.svg";
import vector from "../../../public/images/id_card/vector.svg";
import DownloadIndiv from "../../../public/images/id_card/downloadindiv.svg";
import educationIcon from "../../../public/images/id_card/school.svg";
import healthIcon from "../../../public/images/id_card/health.svg";
import propertyIcon from "../../../public/images/id_card/house.svg";
import familyIcon from "../../../public/images/id_card/family.svg";
import careerIcon from "../../../public/images/id_card/career.svg";
import financeIcon from "../../../public/images/id_card/finance.svg";

const categoryIcons = {
  Education: educationIcon,
  Health: healthIcon,
  Property: propertyIcon,
  Family: familyIcon,
  Career: careerIcon,
  Finance: financeIcon,
};

export default function Info() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docuData, setDocuData] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Health");
  const getFileNameWithoutExtension = (fileName) => {
    return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  };

  const categories = [
    { name: "Health", index: 0 },
    { name: "Career", index: 1 },
    { name: "Education", index: 2 },
    { name: "Family", index: 3 },
    { name: "Finance", index: 4 },
    { name: "Property", index: 5 },
  ];

  const tabsRef = useRef([]);

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      if (currentTab) {
        setTabUnderlineLeft(currentTab.offsetLeft);
        setTabUnderlineWidth(currentTab.clientWidth);
      }
    };


    setTabPosition();
    const category = categories.find(cat => cat.index === activeTabIndex);
    setSelectedCategory(category.name)
  }, [activeTabIndex]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: res } = await axiosInstance.get("/users/" + router.query.id);
        setData(res);
        await fetchDocuments();
      } catch (error) {
        console.error(error.message);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    if (router.query.id) {
      fetchData();
    }
  }, [selectedCategory]);

  const fetchDocuments = async () => {
    const userID = router.query.id
    if (!userID) {
      console.log('No userID found in localStorage');
      return;
    }
  
    const payload = {
      id: userID,
      category: selectedCategory, 
    };
  
    try {
      const { data: res } = await axiosInstance.post(`/document/retrieve`, payload);
      setDocuData(res.documents);
      
    } catch (error) {
      console.error('Error fetching documents:', error.message);
    }
  };

  const renderImportantInfo = (important) => {
    try {
      const parsedImportant = JSON.parse(important);
  
      if (!parsedImportant || typeof parsedImportant !== 'object') {
        throw new Error("Invalid important information structure");
      }
  
      const formatKey = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  
      return (
        <div className="text-left">
          <ul className="leading-loose">
            {Object.entries(parsedImportant).map(([key, value], idx) => (
              <li key={idx}>
                <div className="flex flex-row md:text-[1.5vw] text-[4vw] font-semibold text-lightgray">{formatKey(key)}:</div>
                {Array.isArray(value) ? (
                  <ul className="ml-4">
                    {value.map((item, subIdx) => (
                      <li key={subIdx} className="md:text-[1.2vw] text-[3.5vw] text-darkblue">
                        {typeof item === 'object' ? (
                          <ul className="ml-4">
                            {Object.entries(item).map(([subKey, subValue], subSubIdx) => (
                              <li key={subSubIdx} className="flex flex-row items-baseline">
                                <div className="flex-shrink-0 md:text-[1.5vw] text-[4vw] font-semibold text-darkblue">{formatKey(subKey)}:</div>
                                <div className="pl-2 md:text-[1.2vw] text-[3.5vw] text-darkblue">{Array.isArray(subValue) ? subValue.join(', ') : subValue}</div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="md:text-[1.2vw] text-[3.5vw] font-semibold text-darkblue ">{item}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : typeof value === 'object' ? (
                  <ul className="ml-4">
                    {Object.entries(value).map(([subKey, subValue], subIdx) => (
                      <li key={subIdx} className="flex flex-row items-baseline ">
                        <div className="flex-shrink-0 md:text-[1.5vw] text-[4vw] font-semibold text-darkblue">{formatKey(subKey)}:</div>
                        <div className="pl-2 md:text-[1.2vw] text-[3.5vw] text-darkblue">{Array.isArray(subValue) ? subValue.join(', ') : subValue}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="md:text-[1.2vw] text-[3.5vw] text-darkblue">{value}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    } catch (error) {
      console.error("Error parsing important information:", error.message, error.stack);
      return <p>Error parsing important information</p>;
    }
  };
  

  const handleDownloadPDF = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = ''; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    docuData.forEach((document, index) => {
      if (document.file_url) {
        setTimeout(() => {
          handleDownloadPDF(`${document.file_url}?disposition=attachment`);
        }, index * 100); 
      }
    });
  };

  return (
    <div className="bg-local bg-[url('../../public/images/background/gebirah-bluebg.png')] bg-cover min-h-screen text-center lg:px-[8vw]">
      <div className="flex items-center pt-4 ml-4">
        <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
        <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
      </div>
      <br />
      <div className="flex flex-col xl:flex-row overflow-hidden">
        <div className="flex flex-row justify-between xl:flex xl:flex-col lg:mr-[2vw]">
          <div className="flex flex-col w-full">
            {data && (
              <div className="w-[90%] md:w-auto md:p-[2vw] mx-auto lg:p-5 id-card transition duration-500">
                <div className="flex justify-center">
                  <ProfilePic src={props.data.photo}/>
                  <div className="flex flex-col pl-[2vw] text-left flex-grow">
                    <div className="text-left pb-[0.5vw]">
                      <div className="font-bold uppercase text-[4vw] md:text-2xl xl:text-xxl text-darkblue">
                        {data.name}
                      </div>
                      <div className="text-[4vw] md:text-2xl xl:text-xl text-darkblue">
                        000-000-00{data.id}
                      </div>
                    </div>
                    <PersonalInfo
                      sex={data.gender}
                      status={data.verification_status}
                      issuedDate={"no column"}
                      expiryDate={"no column"}
                      dob={data.date_birth}
                      country={data.country}
                      religion={data.religion}
                      ethnicity={data.ethnicity}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="pt-10 mx-4 md:mx-[4vw] lg:mx-2">
              <div className="flex flex-row items-center justify-center bg-darkblue text-white font-semibold md:text-[3vw] xl:text-[1.5vw] py-1 md:py-2 rounded-lg" onClick={handleDownloadAll}>
                Download All
                <div className="px-2">
                  <Image className="items-center w-[4vw] md:w-[2.8vw] xl:w-[1.3vw]" src={download} />
                </div>
              </div>
            <div className="hidden lg:flex lg:w-full lg:justify-center lg:items-center">
                <Image src={vector} className="w-full h-auto" />
            </div>
            </div>
          </div>
        </div>
        <div className="w-full mb-10 px-4 md:px-[4vw] lg:px-0 pt-[6vw] xl:w-[60%] lg:pt-0 md:flex md:flex-col">
          <div className="relative flex flex-row w-full rounded-lg bg-[#E7E7E7] backdrop-blur-sm">
            <span
              className="absolute bottom-0 top-0 -z-10 flex overflow-hidden transition-all duration-300"
              style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            >
              <span className="h-full w-full rounded-t-lg bg-darkblue" />
            </span>
            {categories.map((category, index) => {
              const isActive = activeTabIndex === index;
              const isLast = index === categories.length - 1;
              return (
                <div
                  className={`flex-grow font-bold py-1 rounded-t-lg md:text-[3vw] xl:text-[1.5vw] text-[#939393] md:shadow-xl ${
                    isActive
                      ? "text-white shadow-2xl md:px-5 px-2 z-20 relative"
                      : "z-10 px-2 md:px-5 text-[#939393] shadow-md md:shadow-md"
                  }`}
                  style={{ marginRight: isLast ? "0" : "2px", top: isActive ? "-2px" : "0" }}
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el)}
                  onClick={() => setActiveTabIndex(index)}
                >
                  <div className="flex justify-center md:hidden">
                    {isActive ? (
                      <span className="flex">{category.name}</span>
                    ) : (
                      <div className="flex w-full justify-center">
                        <span className="w-5 h-5 flex items-center justify-center">
                          <Image src={categoryIcons[category.name]} alt={category.name} />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block">{category.name}</div>
                </div>
              );
            })}
          </div>
          <div className="w-full rounded-b-lg rounded-r-lg md:rounded-b-lg md:rounded-tr-none">
            {loading && <Loading text={"Loading..."} />}
            {!loading && !data && <Loading text={"500: Internal Error\nUnable to fetch user data"} />}
            <div className="flex flex-col space-y-5 md:space-y-10">
                {console.log(docuData)}
                {docuData.length > 0 ? (
                    docuData.map((document) => (
                        <div key={document.id} className="overflow-auto max-h-[500px] text-left bg-white w-full md:px-6 px-4 pb-[4vw] md:pb-[2vw] md:pt-4 pt-2 rounded-lg flex flex-row relative">
                        <div>
                            <div className="capitalize text-[5vw] md:text-[1.5vw] font-bold text-darkblue">{getFileNameWithoutExtension(document.name)}</div>
                            {document.important ? (
                            renderImportantInfo(document.important)
                            ) : (
                            <p>No additional information available</p>
                            )}
                        </div>
                        {document.important && (
                            <Image className="w-[10%] md:w-[3vw] absolute top-0 right-0 pr-2 pt-[2vw] md:pt-[1vw]" src={DownloadIndiv} alt='download individually' onClick={() => handleDownloadPDF(`${document.file_url}?disposition=attachment`)}
                            style={{ cursor: 'pointer' }} />
                        )}
                        </div>
                    ))
                ) : (
                    <div className="overflow-auto max-h-[500px] bg-white w-full justify-center md:px-6 px-4 pb-[4vw] md:pb-[2vw] md:pt-4 pt-2 rounded-lg">
                      <p>No documents available for the selected category.</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {
    const { query } = context;
    const initialCategory = query.category || "Health"; // Default to "Health" if not specified
  
    return {
      props: {
        initialCategory,
      },
    };
  }