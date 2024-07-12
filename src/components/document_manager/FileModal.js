import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Image from "next/image";
import styles from "../../pages/gebirah.module.css"
import { styled } from '@mui/material/styles';
import React, {useEffect, useState} from "react";
import ImageWithSpinner from "@/components/ImageWithSpinner";
import fileIcon from "../../../public/images/file_icon.svg";


const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(0%, -50%);
  width: 30%;
  border: 4px solid #4B5563;
  border-radius: 25px;
  box-shadow: 24px;
  overflow: hidden
`;

const DescriptionBox = styled(Box)`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(0%, -50%);
  width: 40%;
  border: 4px solid #4B5563;
  border-radius: 25px;
  box-shadow: 24px;
  overflow: hidden
`;

const ModalBoxMobile = styled(Box)`
  @media (max-width: 600px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    border: 4px solid #34343C;
    border-radius: 25px;
    box-shadow: 24px;
    overflow: hidden
  }
`;

export default function FileModal(props) {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const parseJSON = (json) => {
      try {
        return JSON.parse(json);
      } catch (error) {
        console.error('Invalid JSON string', error);
        return {};
      }
    };
    const description = parseJSON(props.description);
    const capitalizeWords = (str) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    const JSONDisplay = ({ data }) => {
        const renderValue = (value) => {
            if (typeof value === 'object' && value !== null) {
              return (
                <pre>{JSON.stringify(value, null, 2)}</pre> // Renders objects as a pretty-printed JSON string
              );
            }
            return value !== null ? value.toString() : 'N/A';
          };
      return (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className='mb-8 text-black'>
              <strong>{capitalizeWords(key)}:</strong> {renderValue(value)}
            </div>
          ))}
        </div>
      );
    };

    function isImageFile(filename) {
        const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|tiff|svg|webp)$/i;
        return imageExtensions.test(filename);
    }

    useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

    useEffect(() => {
    setShow(true);
  }, []);
    return (
        <>
        <div className='py-8 flex flex-row items-center' onClick={handleOpen}>
            <div className="ml-6 md:w-[2vw] w-[2vw]">
                <Image src={fileIcon} layout={"responsive"} alt="File icon"/>
            </div>
            <h1 className='ml-8 text-darkblue font-bold md:text-[2vw] text-[3vw]'>
                {props.title}
            </h1>
            {/*<iframe className="md:h-[12vw] h-[16vw] md:w-5/6 w-full" src={url}/>*/}
            {/*<h1 className='lg:text-lg text-md md:mt-10 mt-4 font-bold'>{title}</h1>*/}
        </div>
        <hr className="md:border-t-4 border-t-2 border-[#B0B0B0]/50" />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
              {isMobile ? (
          <div className={`opacity-0 ${show ? styles.fadeModalMobile : ""}`}>
              <ModalBoxMobile>
                      {isImageFile(props.title) ? (
                            <div className="h-[100vw] w-full">
                                <Image alt="Image of document" src={props.url} width="100" layout="responsive"/>
                            </div>
                        ):
                        (
                            <div>
                                <iframe className="h-[100vw] w-full" src={props.url}/>
                            </div>
                        )
                    }
                  <div className="bg-[#34343C] p-4">
                    <h1 className='text-md text-white'>{description}</h1>
                    </div>
              </ModalBoxMobile>
          </div>
          ) : (
          <div className={`opacity-0 ${show ? styles.fadeModal: ""}`}>
            <ModalBox>
                {isImageFile(props.title) ? (
                        <div className="h-[35vw] w-full">
                            <Image alt="Image of document" src={props.url} width="100" height="450" layout="responsive"/>
                        </div>
                    ):
                    (
                        <div>
                            <iframe className="h-[35vw] w-full" src={props.url}/>
                        </div>
                    )
                }
            </ModalBox>
              <DescriptionBox>
                  <div className="bg-white px-8 py-8">
                      <JSONDisplay data={description} />
                    {/*<h1 className='text-md text-white bottom-4'>{props.description}</h1>*/}
                 </div>
              </DescriptionBox>
          </div>
                  )}
        </Modal>
     </>
    )
}
