"use client";

import {useEffect, useState} from "react";
import StepPersonalInfo from "./steps/StepPersonalInfo";
import StepFamilyInfo from "./steps/StepFamilyInfo";
import StepEducationInfo from "./steps/StepEducationInfo";
import StepWorkExperience from "./steps/StepWorkExperience";
import StepLanguages from "./steps/StepLanguages";
import StepAdditionalInfo from "./steps/StepAdditionalInfo";
import StepComputerSkills from "./steps/StepComputerSkills";
import StepPublications from "./steps/StepPublications";
import StepReview from "./steps/StepReview";
import StepReferences from "./steps/StepReferences";
import StepTraining from "./steps/StepTraining";
import axios from "axios";


export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(null);
    const [successStatus, setSuccessStatus] = useState(false);
    const [candidateNumber, setCandidateNumber] = useState(0);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;


    const [formData, setFormData] = useState({
        jobPosition: "",
        jobPositionName: "",
        campusID:"",
        campusName:"",
        name: "",
        surname: "",
        tcNo: "",
        password: "",
        nationality: "",
        militaryStatus: false,
        photo: "",
        spouseName: "",
        spouseJob: "",
        birthDate: "",
        email: "",
        gender: "",
        phone: "",
        address: "",
        children: [],
        education: [{ level: "", schoolName: "", department: "" }],
        workExperience: [ {
            institutionName: "",
            position: "",
            duration: "",
            reasonForLeaving: "",
        }],
        languageSkills: [],
        additionalInfo: {
            pedagogicalCert: "",
            internship: "",
            teachingExperience: "",
            experienceState: "",
            extraNotes: "",
        },
        computerSkills: [],
        publications: [],
        references: [],
        trainings: [],
    });

    // const [formData, setFormData] = useState({
    //     jobPosition: "5",
    //     campusID: "3",
    //     name: "Mustafa",
    //     surname: "YILDIZ",
    //     tcNo: "18890341172",
    //     passport: "",
    //     nationality: "TC",
    //     militaryStatus: true,
    //     photo: "asdasdasd.jpg",
    //     gender: 'Kadın',
    //     spouseName: "Ayşe Yılmaz",
    //     spouseJob: "Ev Hanımı",
    //     birthDate: "1988-03-18",
    //     email: "ahmet.yilmaz@example.com",
    //     phone: "05396953016",
    //     address: "İstanbul, Türkiye",
    //     children: [
    //         {
    //             childName: "Ali Yılmaz",
    //             birthDate: "2015-03-10",
    //             school: "XYZ İlkokulu",
    //         },
    //         {
    //             childName: "Zeynep Yılmaz",
    //             birthDate: "2018-07-25",
    //             school: "ABC Anaokulu",
    //         },
    //     ],
    //     education: [
    //         {
    //             level: "Lisans",
    //             schoolName: "İstanbul Üniversitesi",
    //             department: "Bilgisayar Mühendisliği",
    //         },
    //         {
    //             level: "Yüksek Lisans",
    //             schoolName: "Boğaziçi Üniversitesi",
    //             department: "Yapay Zeka ve Veri Bilimi",
    //         },
    //     ],
    //     workExperience: [
    //         {
    //             institutionName: "ABC Yazılım A.Ş.",
    //             position: "Yazılım Geliştirici",
    //             duration: "2 yıl",
    //             reasonForLeaving: "Daha iyi bir fırsat",
    //         },
    //         {
    //             institutionName: "XYZ Teknoloji Ltd.",
    //             position: "Kıdemli Yazılım Geliştirici",
    //             duration: "3 yıl",
    //             reasonForLeaving: "Kariyer değişikliği",
    //         },
    //     ],
    //     languageSkills: [
    //         {
    //             language: "İngilizce",
    //             speaking: "Çok İyi",
    //             understanding: "Çok İyi",
    //             writing: "İyi",
    //         },
    //         {
    //             language: "Almanca",
    //             speaking: "Orta",
    //             understanding: "Orta",
    //             writing: "Başlangıç",
    //         },
    //     ],
    //     additionalInfo: {
    //         pedagogicalCert: "Var",
    //         internship: "Evet",
    //         teachingExperience: "2 yıl",
    //         experienceState: "Özel",
    //         extraNotes: "Ekstra bir not burada belirtilebilir.",
    //     },
    //     computerSkills: [
    //         {
    //             programName: "Python",
    //         },
    //         {
    //             programName: "JavaScript",
    //         },
    //         {
    //             programName: "React",
    //         },
    //     ],
    //     publications: [
    //         {
    //             title: "Yapay Zeka ve Etik",
    //             year: 2021,
    //             publisher: "Teknoloji Dergisi",
    //             content: "Yapay zekanın etik boyutları üzerine bir makale.",
    //         },
    //         {
    //             title: "Veri Bilimi ve Analitik",
    //             year: 2020,
    //             publisher: "Bilimsel Araştırmalar Dergisi",
    //             content: "Veri bilimi ve analitik süreçler üzerine bir inceleme.",
    //         },
    //     ],
    //     references: [
    //         {
    //             name: "Mehmet Kaya",
    //             institution: "XYZ Teknoloji Ltd.",
    //             contact: "+90 532 654 3210",
    //         },
    //         {
    //             name: "Fatma Demir",
    //             institution: "ABC Yazılım A.Ş.",
    //             contact: "+90 534 987 6543",
    //         },
    //     ],
    //     trainings: [
    //         {
    //             courseName: "Yazılım Mühendisliği Sertifika Programı",
    //             institution: "Kodlama Akademisi",
    //             year: 2021,
    //         },
    //         {
    //             courseName: "Proje Yönetimi Eğitimi",
    //             institution: "İstanbul Teknik Üniversitesi",
    //             year: 2019,
    //         },
    //     ],
    // });

    const handleNext = (data) => {
        setFormData({...formData, ...data});
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();

            Object.keys(formData).forEach((key) => {
                if (key === "photo" && formData[key]) {
                    formDataToSend.append(key, formData[key]);
                } else if (typeof formData[key] === "object" && formData[key] !== null) {
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const requestUrl = `${apiBaseUrl}/save-aplicate-data`;

            const response = await axios.post(requestUrl, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Api-Key": apiKey,
                },
            });


            if (response.data.status) {
                const candidateNum = response.data.candidateId?.candidateNumber || "-";
                setCandidateNumber(candidateNum)
                setSuccessStatus(true)
                setErrors([]);
            } else {
                setSuccess(null);
                setSuccessStatus(false);

                const errorList = Array.isArray(response.data.errors)
                    ? response.data.errors.map((error) =>
                        error.replace(/<\/?p>/g, "")
                    )
                    : response.data.errors
                        ? response.data.errors
                            .replace(/<\/?p>/g, "")
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                        : response.data.message
                            ? [response.data.message]
                            : ["Bilinmeyen bir hata oluştu."];

                setErrors(errorList);
            }

        } catch (error) {
            console.error("API İsteği Hatası:", error);
            setErrors(["Sunucuya bağlanırken bir hata oluştu!"]);
        }
    };
    return (
        <div className="container mx-auto px-5 py-8">
            <div className="container mx-auto px-5 py-8">
                {/* Adım İsimleri */}
                <div className="mb-4">
                    <div className="flex justify-center flex-wrap gap-2">
                        {[
                            "Kişisel Bilgiler",
                            "Aile Bilgileri",
                            "Eğitim Bilgileri",
                            "İş Deneyimi",
                            "Dil Bilgileri",
                            "Ek Bilgiler",
                            "Bilgisayar Yetkinlikleri",
                            "Eğitimler",
                            "Yayınlar",
                            "Referanslar",
                            "Gözden Geçir"
                        ].map((stepName, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                    currentStep === index + 1
                                        ? "bg-blue-800 text-white"
                                        : "bg-gray-200 text-blue-800 hover:bg-gray-300"
                                }`}
                                onClick={() => setCurrentStep(index + 1)}
                            >
                                {stepName}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Kart Alanı */}
                {/*<div className="bg-gray-100 p-6 rounded-lg shadow">*/}
                {/*    /!* Başlık *!/*/}
                {/*    <h1 className="text-lg font-semibold text-center mb-6 text-blue-800">*/}
                {/*        {[*/}
                {/*            "Kişisel Bilgiler",*/}
                {/*            "Aile Bilgileri",*/}
                {/*            "Eğitim Bilgileri",*/}
                {/*            "İş Deneyimi",*/}
                {/*            "Dil Bilgileri",*/}
                {/*            "Ek Bilgiler",*/}
                {/*            "Bilgisayar Yetkinlikleri",*/}
                {/*            "Eğitimler",*/}
                {/*            "Yayınlar",*/}
                {/*            "Referanslar",*/}
                {/*            "Gözden Geçir"*/}
                {/*        ][currentStep - 1]} ({currentStep} / 11)*/}
                {/*    </h1>*/}

                {/*    /!* Burada adım içerikleri yer alacak *!/*/}
                {/*</div>*/}
            </div>


            {/* Başarı ve Hata Mesajları */}
            {success && (
                <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
                    {success}
                </div>
            )}

            {errors.length > 0 && (
                <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
                    <strong>Hatalar:</strong>
                    <ul className="list-disc ml-5">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {currentStep === 1 && (
                <StepPersonalInfo onNext={handleNext} formData={formData} setFormData={setFormData}/>
            )}
            {currentStep === 2 && (
                <StepFamilyInfo
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {currentStep === 3 && (
                <StepEducationInfo
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {currentStep === 4 && (
                <StepWorkExperience
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {currentStep === 5 && (
                <StepLanguages
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {currentStep === 6 && (
                <StepAdditionalInfo
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {currentStep === 7 && (
                <StepComputerSkills
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                />
            )}
            {currentStep === 8 && (
                <StepTraining
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {currentStep === 9 && (
                <StepPublications
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {currentStep === 10 && (
                <StepReferences
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {currentStep === 11 && (
                <StepReview
                    formData={formData}
                    onPrevious={handlePrevious}
                    onSubmit={handleSubmit}
                    errors={errors}
                    successStatus={successStatus}
                    candidateNumber={candidateNumber}
                />
            )}
        </div>
    );
}
