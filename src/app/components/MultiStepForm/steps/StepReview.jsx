"use client";


import {useEffect, useState} from "react";

const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};
export default function StepReview({
                                       formData,
                                       onPrevious,
                                       onSubmit,
                                       errors,
                                       successStatus,
                                       candidateNumber
                                   }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const photoPreview = formData.photo
        ? URL.createObjectURL(formData.photo)
        : null;

    useEffect(() => {
        if (errors && errors.length > 0) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
        if (successStatus) {
            setIsModalOpen(true);
        }
    }, [errors, successStatus]);

    useEffect(() => {
        if (isModalOpen) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleModalClose();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isModalOpen]);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setTimeout(()=>{
            window.location.reload();
        },1000)
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Kayıt Başarılı!</h2>
                        <p className="text-lg">
                            Aday Numaranız: <strong>{candidateNumber}</strong>
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            Mail adresinize aday numaranız iletilmiştir.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Bu pencere otomatik olarak kapanacaktır:{" "}
                            <strong>{countdown} saniye</strong>
                        </p>
                        <button
                            onClick={handleModalClose}
                            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow"
                        >
                            Kapat
                        </button>
                    </div>
                </div>
            )}
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Bilgileri Gözden Geçir
                </h2>
            </div>

                {/* Fotoğraf */}
                {photoPreview && (
                    <div className="text-center mb-6">
                        <img
                            src={photoPreview}
                            alt="Yüklenen Fotoğraf"
                            className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                        />
                        <p className="text-sm text-gray-500 mt-2">Yüklenen Fotoğraf</p>
                    </div>
                )}

                <div className="space-y-6">
                    {/* Kişisel Bilgiler */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Kişisel Bilgiler
                        </h3>
                        <ul className="space-y-2">
                            <li><strong>Ad:</strong> {formData.name}</li>
                            <li><strong>Soyad:</strong> {formData.surname}</li>
                            <li><strong>TC No:</strong> {formData.tcNo || "-"}</li>
                            <li><strong>Cinsiyet:</strong> {formData.gender || "-"}</li>
                            <li><strong>Pasaport:</strong> {formData.passport || "-"}</li>
                            <li><strong>Doğum Tarihi:</strong> {formatDate(formData.birthDate)}</li>
                            <li><strong>Email:</strong> {formData.email}</li>
                            <li><strong>Telefon:</strong> {formData.phone}</li>
                            <li><strong>Adres:</strong> {formData.address}</li>
                            <li><strong>Uyruğu:</strong> {formData.nationality}</li>
                            {
                                formData.gender === 'Erkek' &&
                                <li>
                                    <strong>Askerlik Durumu:</strong>{" "}
                                    {formData.militaryStatus ? "Tamamlandı" : "Tamamlanmadı"}
                                </li>
                            }

                        </ul>
                    </div>

                    {/* Görev Pozisyonu */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Görev Pozisyonu
                        </h3>
                        <p>{formData.jobPositionName || "Görev pozisyonu bilgisi bulunmamaktadır."}</p>
                    </div>

                    {/* Kampüs */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Kampüs
                        </h3>
                        <p>{formData.campusName || "Kampüs bilgisi bulunmamaktadır."}</p>
                    </div>

                    {/* Eğitim Bilgileri */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Eğitim Bilgileri
                        </h3>
                        {formData.education.length > 0 ? (
                            <ul className="space-y-2">
                                {formData.education.map((edu, index) => (
                                    <li key={index}>
                                        <strong>Seviye:</strong> {edu.level}, <strong>Okul:</strong> {edu.schoolName}, <strong>Bölüm:</strong> {edu.department}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span>Eğitim bilgisi bulunmamaktadır.</span>
                        )}
                    </div>

                    {/* İş Tecrübeleri */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            İş Tecrübeleri
                        </h3>
                        {formData.workExperience.length > 0 ? (
                            <ul className="space-y-2">
                                {formData.workExperience.map((job, index) => (
                                    <li key={index}>
                                        <strong>Şirket:</strong> {job.institutionName}, <strong>Pozisyon:</strong> {job.position}, <strong>Süre:</strong> {job.duration}, <strong>Ayrılma
                                        Nedeni:</strong> {job.reasonForLeaving}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span>İş tecrübesi bilgisi bulunmamaktadır.</span>
                        )}
                    </div>
                    {/* Aile Bilgileri */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Aile Bilgileri
                        </h3>
                        <ul className="space-y-2">
                            <li><strong>Eş Adı:</strong> {formData.spouseName}</li>
                            <li><strong>Eş Mesleği:</strong> {formData.spouseJob}</li>
                            <li>
                                <strong>Çocuklar:</strong>
                                {formData.children.length > 0 ? (
                                    <ul className="pl-6">
                                        {formData.children.map((child, index) => (
                                            <li key={index}>
                                                <strong>Ad:</strong> {child.childName}, <strong>Doğum
                                                Tarihi:</strong> {child.birthDate}, <strong>Okul:</strong> {child.school || "-"}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>Çocuk bilgisi bulunmamaktadır.</span>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Dil Bilgileri */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Dil Bilgileri
                        </h3>
                        {formData.languageSkills.length > 0 ? (
                            <ul className="space-y-2">
                                {formData.languageSkills.map((lang, index) => (
                                    <li key={index}>
                                        <strong>Dil:</strong> {lang.language}, <strong>Konuşma:</strong> {lang.speaking}, <strong>Anlama:</strong> {lang.understanding}, <strong>Yazma:</strong> {lang.writing}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span>Dil bilgisi bulunmamaktadır.</span>
                        )}
                    </div>

                    {/* Ek Bilgiler */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Ek Bilgiler
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <strong>Pedagojik Sertifika:</strong>{" "}
                                {formData.additionalInfo.pedagogicalCert || "-"}
                            </li>
                            <li>
                                <strong>Staj:</strong>{" "}
                                {formData.additionalInfo.internship || "-"}
                            </li>
                            <li>
                                <strong>Öğretmenlik Tecrübesi:</strong>{" "}
                                {formData.additionalInfo.teachingExperience || "-"}
                            </li>
                            <li>
                                <strong>Tecrübe Durumu:</strong>{" "}
                                {formData.additionalInfo.experienceState || "-"}
                            </li>
                            <li>
                                <strong>Ek Notlar:</strong>{" "}
                                {formData.additionalInfo.extraNotes || "-"}
                            </li>
                        </ul>
                    </div>

                    {/* Bilgisayar Becerileri */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Bilgisayar Becerileri
                        </h3>
                        {formData.computerSkills.length > 0 ? (
                            <ul className="space-y-2">
                                {formData.computerSkills.map((skill, index) => (
                                    <li key={index}><strong>Program:</strong> {skill.programName}</li>
                                ))}
                            </ul>
                        ) : (
                            <span>Bilgisayar becerisi bilgisi bulunmamaktadır.</span>
                        )}
                    </div>

                    {/* Yayınlar */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Yayınlar
                        </h3>
                        {formData.publications.length > 0 ? (
                            <ul className="space-y-2">
                                {formData.publications.map((pub, index) => (
                                    <li key={index}>
                                        <strong>Başlık:</strong> {pub.title}, <strong>Yıl:</strong> {pub.year}, <strong>Yayınevi:</strong> {pub.publisher}, <strong>İçerik:</strong> {pub.content}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span>Yayın bilgisi bulunmamaktadır.</span>
                        )}
                    </div>

                    {/* Referanslar */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Referanslar
                        </h3>
                        {formData.references.length > 0 ? (
                            <ul className="space-y-2">
                                {formData.references.map((ref, index) => (
                                    <li key={index}>
                                        <strong>Ad:</strong> {ref.name}, <strong>Kurum:</strong> {ref.institution}, <strong>İletişim:</strong> {ref.contact}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span>Referans bilgisi bulunmamaktadır.</span>
                        )}
                    </div>

                    {/* Eğitimler */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            Eğitimler
                        </h3>
                        {formData.trainings.length > 0 ? (
                            <ul className="space-y-2">
                                {formData.trainings.map((training, index) => (
                                    <li key={index}>
                                        <strong>Kurs
                                            Adı:</strong> {training.courseName}, <strong>Kurum:</strong> {training.institution}, <strong>Yıl:</strong> {training.year}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span>Eğitim bilgisi bulunmamaktadır.</span>
                        )}
                    </div>
                </div>

                {/* Butonlar */}
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600"
                    >
                        Geri
                    </button>
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Gönder
                    </button>
                </div>
            </>
            );
            }
