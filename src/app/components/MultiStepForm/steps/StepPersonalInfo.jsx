"use client";

import {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
export default function StepPersonalInfo({ onNext, formData,setFormData }) {
    const [photoPreview, setPhotoPreview] = useState(null);
    const [jobPositions, setJobPositions] = useState([]);
    const [campusInfo, setCampusInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        if (formData.photo) {
            setPhotoPreview(URL.createObjectURL(formData.photo));
        }
    }, [formData.photo]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Ad zorunludur")
            .trim()
            .max(50, "Ad en fazla 50 karakter olabilir"),
        surname: Yup.string()
            .required("Soyad zorunludur")
            .trim()
            .max(50, "Soyad en fazla 50 karakter olabilir"),
        jobPosition: Yup.string()
            .required("Görev pozisyonu zorunludur")
            .trim(),
        campusID: Yup.string()
            .required("Kampüs seçimi zorunludur")
            .trim(),
        tcNo: Yup.string()
            .matches(/^\d{11}$/, "TC Kimlik No 11 haneli olmalıdır")
            .nullable(),
        passport: Yup.string()
            .matches(/^\d{9}$/, "Pasaport numarası 9 haneli olmalıdır")
            .nullable(),
        birthDate: Yup.date()
            .required("Doğum tarihi zorunludur")
            .max(new Date(), "Doğum tarihi bugünden ileri olamaz"),
        email: Yup.string()
            .email("Geçerli bir e-posta adresi giriniz")
            .required("E-posta zorunludur")
            .trim(),
        phone: Yup.string()
            .required("Telefon zorunludur")
            .matches(/^\+?[0-9]{10,15}$/, "Geçerli bir telefon numarası giriniz"),
        address: Yup.string()
            .required("Adres zorunludur")
            .trim()
            .max(255, "Adres en fazla 255 karakter olabilir"),
        photo: Yup.mixed()
            .required("Fotoğraf zorunludur")
            .test(
                "fileSize",
                "Fotoğraf boyutu en fazla 2MB olmalıdır",
                (value) => !value || (value.size <= 2 * 1024 * 1024)
            )
            .test(
                "fileType",
                "Sadece jpg, jpeg, png formatları kabul edilir",
                (value) =>
                    !value ||
                    ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
            ),
        nationality: Yup.string()
            .required("Uyruk zorunludur")
            .trim(),
        militaryStatus: Yup.boolean().required("Askerlik durumu zorunludur"),
        gender: Yup.string()
            .oneOf(["Erkek", "Kadın"], "Geçerli bir cinsiyet seçiniz")
            .required("Cinsiyet zorunludur"),
    }).test(
        "tcNo-or-passport",
        "TC Kimlik No veya Pasaport numarasından biri doldurulmalıdır.",
        function (values) {
            const { tcNo, passport } = values || {};
            if (!tcNo && !passport) {
                return this.createError({
                    path: "tcNo",
                    message: "TC Kimlik No veya Pasaport numarasından biri doldurulmalıdır.",
                });
            }
            if (
                (tcNo && /^\d{11}$/.test(tcNo)) ||
                (passport && /^\d{9}$/.test(passport))
            ) {
                return true;
            }
            return this.createError({
                path: "passport",
                message: "TC Kimlik No veya Pasaport numarası formatı hatalı.",
            });
        }
    );



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const config = {
                    headers: {
                        "X-Api-Key": apiKey
                    },
                };




                const [jobResponse, campusResponse] = await Promise.all([
                    axios.get(`${apiUrl}/get-job-positions`, config),
                    axios.get(`${apiUrl}/get-campus-info`, config),
                ]);

                if (jobResponse.data.status) {
                    setJobPositions(jobResponse.data.data);
                }

                if (campusResponse.data.status) {
                    setCampusInfo(campusResponse.data.data);
                }
            } catch (error) {
                console.error("API çağrısı sırasında bir hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Kişisel Bilgiler
                </h2>
            </div>

            <Formik
                initialValues={{
                    name: formData.name || "",
                    surname: formData.surname || "",
                        tcNo: formData.tcNo || "",
                        birthDate: formData.birthDate || "",
                        email: formData.email || "",
                        phone: formData.phone || "",
                        address: formData.address || "",
                        photo: formData.photo || null,
                        campusID: formData.campusID || "",
                        jobPosition: formData.jobPosition || "",
                        nationality: formData.nationality || "",
                        militaryStatus: formData.militaryStatus || false,
                        passport: formData.passport || "",
                        gender: formData.gender || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        setFormData({...formData, ...values});
                        onNext(values);
                    }}
                >
                    {({setFieldValue, isSubmitting}) => (
                        <Form className="space-y-6">
                            {/* Fotoğraf Önizleme */}
                            {photoPreview && (
                                <div className="mb-4 text-center">
                                    <img
                                        src={photoPreview}
                                        alt="Seçilen Fotoğraf"
                                        className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                                    />
                                    <p className="text-sm text-gray-500 mt-2">Seçilen Fotoğraf</p>
                                </div>
                            )}
                            {/* Fotoğraf */}
                            <div>
                                <label
                                    htmlFor="photo"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Fotoğraf Yükle
                                </label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setFieldValue("photo", file);
                                        setFormData({...formData, photo: file});
                                        if (file) {
                                            setPhotoPreview(URL.createObjectURL(file));
                                        } else {
                                            setPhotoPreview(null);
                                        }
                                    }}
                                />
                                <ErrorMessage
                                    name="photo"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Görev Pozisyonları */}
                            <div>
                                <label
                                    htmlFor="jobPosition"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Görev Pozisyonları
                                </label>
                                <Field
                                    as="select"
                                    name="jobPosition"
                                    id="jobPosition"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(event) => {
                                        setFieldValue("jobPosition", event.target.value);
                                        const selectedPosition = jobPositions.find(
                                            (position) => position.id === event.target.value
                                        );
                                        setFormData({
                                            ...formData,
                                            jobPosition: event.target.value,
                                            jobPositionName: selectedPosition?.positionName || "",
                                        });
                                    }}
                                >
                                    <option value="">Bir pozisyon seçin</option>
                                    {jobPositions.map((position) => (
                                        <option key={position.id} value={position.id}>
                                            {position.positionName}
                                        </option>
                                    ))}
                                </Field>

                                <ErrorMessage
                                    name="jobPosition"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Kampüs Seçimi */}
                            <div>
                                <label
                                    htmlFor="campusID"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Kampüs Seçimi
                                </label>
                                <Field
                                    as="select"
                                    name="campusID"
                                    id="campusID"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        const selectedCampus = campusInfo.find(
                                            (campus) => campus.campusID === e.target.value
                                        );
                                        setFieldValue("campusID", e.target.value);
                                        setFieldValue("campusName", selectedCampus ? selectedCampus.campusName : "");
                                        setFormData({
                                            ...formData,
                                            campusID: e.target.value,
                                            campusName: selectedCampus ? selectedCampus.campusName : "",
                                        });
                                    }}
                                >
                                    <option value="">Bir kampüs seçin</option>
                                    {campusInfo.map((campus) => (
                                        <option key={campus.campusID} value={campus.campusID}>
                                            {campus.campusName}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="campusID"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Ad */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Ad
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Adınız"
                                    onChange={(e) => {
                                        setFieldValue("name", e.target.value);
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Soyad */}
                            <div>
                                <label
                                    htmlFor="surname"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Soyad
                                </label>
                                <Field
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Soyadınız"
                                    onChange={(e) => {
                                        setFieldValue("surname", e.target.value);
                                        setFormData({
                                            ...formData,
                                            surname: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="surname"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Cinsiyet */}
                            <div>
                                <label
                                    htmlFor="gender"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Cinsiyet
                                </label>
                                <Field
                                    as="select"
                                    name="gender"
                                    id="gender"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        setFieldValue("gender", e.target.value);
                                        setFormData({
                                            ...formData,
                                            gender: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="Erkek">Erkek</option>
                                    <option value="Kadın">Kadın</option>
                                </Field>
                                <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Askerlik Durumu */}
                            <Field name="gender">
                                {({field}) =>
                                    field.value === "Erkek" && (
                                        <div>
                                            <label
                                                htmlFor="militaryStatus"
                                                className="block text-lg font-semibold text-gray-700 mb-2"
                                            >
                                                Askerlik Durumu
                                            </label>
                                            <Field
                                                as="select"
                                                name="militaryStatus"
                                                id="militaryStatus"
                                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                onChange={(e) => {
                                                    const militaryStatusValue = e.target.value === "true";
                                                    setFieldValue("militaryStatus", militaryStatusValue);
                                                    setFormData({
                                                        ...formData,
                                                        militaryStatus: militaryStatusValue,
                                                    });
                                                }}
                                            >
                                                <option value="true">Tamamlandı</option>
                                                <option value="false">Tamamlanmadı</option>
                                            </Field>
                                            <ErrorMessage
                                                name="militaryStatus"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                    )
                                }
                            </Field>


                            {/* TC Kimlik No */}
                            <div>
                                <label
                                    htmlFor="tcNo"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    TC Kimlik No
                                </label>
                                <Field
                                    type="text"
                                    name="tcNo"
                                    id="tcNo"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="11 haneli TC Kimlik Numaranız"
                                    onChange={(e) => {
                                        setFieldValue("tcNo", e.target.value);
                                        setFormData({
                                            ...formData,
                                            tcNo: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="tcNo"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Pasaport No */}
                            <div>
                                <label
                                    htmlFor="passport"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Pasaport No
                                </label>
                                <Field
                                    type="text"
                                    name="passport"
                                    id="passport"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="9 haneli Pasaport Numaranız"
                                    onChange={(e) => {
                                        setFieldValue("passport", e.target.value);
                                        setFormData({
                                            ...formData,
                                            passport: e.target.value, // Merkezi state'de Pasaport No'yu güncelle
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="passport"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Uyruk */}
                            <div>
                                <label
                                    htmlFor="nationality"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Uyruk
                                </label>
                                <Field
                                    type="text"
                                    name="nationality"
                                    id="nationality"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Uyruk"
                                    onChange={(e) => {
                                        setFieldValue("nationality", e.target.value);
                                        setFormData({
                                            ...formData,
                                            nationality: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="nationality"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Doğum Tarihi */}
                            <div>
                                <label
                                    htmlFor="birthDate"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Doğum Tarihi
                                </label>
                                <Field
                                    type="date"
                                    name="birthDate"
                                    id="birthDate"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        setFieldValue("birthDate", e.target.value);
                                        setFormData({
                                            ...formData,
                                            birthDate: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="birthDate"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* E-posta */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    E-posta
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="example@example.com"
                                    onChange={(e) => {
                                        setFieldValue("email", e.target.value);
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Telefon */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Telefon
                                </label>
                                <Field
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Telefon Numaranız"
                                    onChange={(e) => {
                                        setFieldValue("phone", e.target.value);
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="phone"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Adres */}
                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Adres
                                </label>
                                <Field
                                    as="textarea"
                                    name="address"
                                    id="address"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Adresiniz"
                                    onChange={(e) => {
                                        setFieldValue("address", e.target.value);
                                        setFormData({
                                            ...formData,
                                            address: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="address"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Sonraki Butonu */}
                            <div className="text-right">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Sonraki
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
            );
            }
