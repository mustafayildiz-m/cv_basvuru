"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

export default function StepEducationInfo({ onNext, onPrevious, formData, setFormData }) {
    const validationSchema = Yup.object({
        education: Yup.array()
            .of(
                Yup.object().shape({
                    level: Yup.string().required("Eğitim seviyesi zorunludur"),
                    schoolName: Yup.string().required("Okul adı zorunludur"),
                    department: Yup.string().required("Bölüm adı zorunludur"),
                })
            )
            .min(1, "En az bir eğitim bilgisi eklemelisiniz"),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Eğitim Bilgileri
                </h2>
            </div>
                <Formik
                    initialValues={{
                        education: formData.education || [
                            {level: "", schoolName: "", department: ""},
                        ],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        setFormData({...formData, ...values});
                        onNext(values);
                    }}
                >
                    {({values, setFieldValue, isSubmitting}) => (
                        <Form className="space-y-6">
                            <FieldArray name="education">
                                {({remove, push}) => (
                                    <div>
                                        {values.education.map((education, index) => (
                                            <div
                                                key={index}
                                                className="border p-4 mb-4 rounded-lg shadow-sm"
                                            >
                                                {/* Eğitim Seviyesi */}
                                                <div>
                                                    <label
                                                        htmlFor={`education.${index}.level`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Eğitim Seviyesi
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name={`education.${index}.level`}
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedEducation = [...values.education];
                                                            updatedEducation[index].level = e.target.value;
                                                            setFieldValue("education", updatedEducation);
                                                            setFormData({
                                                                ...formData,
                                                                education: updatedEducation,
                                                            });
                                                        }}
                                                    >
                                                        <option value="">Seçiniz</option>
                                                        <option value="Lise">Lise</option>
                                                        <option value="Ön Lisans">Ön Lisans</option>
                                                        <option value="Lisans">Lisans</option>
                                                        <option value="Yüksek Lisans">Yüksek Lisans</option>
                                                        <option value="Doktora">Doktora</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name={`education.${index}.level`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Okul Adı */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`education.${index}.schoolName`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Okul Adı
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`education.${index}.schoolName`}
                                                        placeholder="Okul Adı"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedEducation = [...values.education];
                                                            updatedEducation[index].schoolName = e.target.value;
                                                            setFieldValue("education", updatedEducation);
                                                            setFormData({
                                                                ...formData,
                                                                education: updatedEducation,
                                                            });
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`education.${index}.schoolName`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Bölüm */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`education.${index}.department`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Bölüm
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`education.${index}.department`}
                                                        placeholder="Bölüm Adı"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedEducation = [...values.education];
                                                            updatedEducation[index].department = e.target.value;
                                                            setFieldValue("education", updatedEducation);
                                                            setFormData({
                                                                ...formData,
                                                                education: updatedEducation,
                                                            });
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`education.${index}.department`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Eğitim Bilgisi Sil */}
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updatedEducation = [...values.education];
                                                            updatedEducation.splice(index, 1);
                                                            setFieldValue("education", updatedEducation);
                                                            setFormData({
                                                                ...formData,
                                                                education: updatedEducation,
                                                            });
                                                            remove(index);
                                                        }}
                                                        className="text-red-500 text-sm mt-2 underline hover:text-red-700"
                                                    >
                                                        Sil
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {/* Eğitim Bilgisi Ekle */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updatedEducation = [
                                                    ...values.education,
                                                    {level: "", schoolName: "", department: ""},
                                                ];
                                                // setFieldValue("education", updatedEducation);
                                                setFormData({
                                                    ...formData,
                                                    education: updatedEducation,
                                                });
                                                push({level: "", schoolName: "", department: ""});
                                            }}
                                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600"
                                        >
                                            Yeni Eğitim Ekle
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            {/* Butonlar */}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={onPrevious}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600"
                                >
                                    Geri
                                </button>
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
