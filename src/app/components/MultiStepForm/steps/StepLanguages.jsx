"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

export default function StepLanguages({ onNext, onPrevious, formData, setFormData }) {
    const validationSchema = Yup.object({
        languageSkills: Yup.array().of(
            Yup.object().shape({
                language: Yup.string().required("Dil adı zorunludur"),
                speaking: Yup.string().required("Konuşma seviyesi zorunludur"),
                understanding: Yup.string().required("Anlama seviyesi zorunludur"),
                writing: Yup.string().required("Yazma seviyesi zorunludur"),
            })
        ),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Dil Bilgileri
                </h2>
            </div>
                <Formik
                    initialValues={{
                        languageSkills: formData.languageSkills || [
                            {language: "", speaking: "", understanding: "", writing: ""},
                        ],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        setFormData({...formData, ...values}); // Merkezi state'i güncelle
                        onNext(values); // Sonraki adıma geç
                    }}
                >
                    {({values, setFieldValue, isSubmitting}) => (
                        <Form className="space-y-6">
                            <FieldArray name="languageSkills">
                                {({remove, push}) => (
                                    <div>
                                        {values.languageSkills.map((language, index) => (
                                            <div
                                                key={index}
                                                className="border p-4 mb-4 rounded-lg shadow-sm"
                                            >
                                                {/* Dil Adı */}
                                                <div>
                                                    <label
                                                        htmlFor={`languageSkills.${index}.language`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Dil Adı
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`languageSkills.${index}.language`}
                                                        placeholder="Dil Adı"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedSkills = [...values.languageSkills];
                                                            updatedSkills[index].language = e.target.value;
                                                            setFieldValue("languageSkills", updatedSkills);
                                                            setFormData({
                                                                ...formData,
                                                                languageSkills: updatedSkills,
                                                            });
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`languageSkills.${index}.language`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Konuşma Seviyesi */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`languageSkills.${index}.speaking`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Konuşma Seviyesi
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name={`languageSkills.${index}.speaking`}
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedSkills = [...values.languageSkills];
                                                            updatedSkills[index].speaking = e.target.value;
                                                            setFieldValue("languageSkills", updatedSkills);
                                                            setFormData({
                                                                ...formData,
                                                                languageSkills: updatedSkills,
                                                            });
                                                        }}
                                                    >
                                                        <option value="">Seçiniz</option>
                                                        <option value="Başlangıç">Başlangıç</option>
                                                        <option value="Orta">Orta</option>
                                                        <option value="İyi">İyi</option>
                                                        <option value="Çok İyi">Çok İyi</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name={`languageSkills.${index}.speaking`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Anlama Seviyesi */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`languageSkills.${index}.understanding`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Anlama Seviyesi
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name={`languageSkills.${index}.understanding`}
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedSkills = [...values.languageSkills];
                                                            updatedSkills[index].understanding = e.target.value;
                                                            setFieldValue("languageSkills", updatedSkills);
                                                            setFormData({
                                                                ...formData,
                                                                languageSkills: updatedSkills,
                                                            });
                                                        }}
                                                    >
                                                        <option value="">Seçiniz</option>
                                                        <option value="Başlangıç">Başlangıç</option>
                                                        <option value="Orta">Orta</option>
                                                        <option value="İyi">İyi</option>
                                                        <option value="Çok İyi">Çok İyi</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name={`languageSkills.${index}.understanding`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Yazma Seviyesi */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`languageSkills.${index}.writing`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Yazma Seviyesi
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name={`languageSkills.${index}.writing`}
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedSkills = [...values.languageSkills];
                                                            updatedSkills[index].writing = e.target.value;
                                                            setFieldValue("languageSkills", updatedSkills);
                                                            setFormData({
                                                                ...formData,
                                                                languageSkills: updatedSkills,
                                                            });
                                                        }}
                                                    >
                                                        <option value="">Seçiniz</option>
                                                        <option value="Başlangıç">Başlangıç</option>
                                                        <option value="Orta">Orta</option>
                                                        <option value="İyi">İyi</option>
                                                        <option value="Çok İyi">Çok İyi</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name={`languageSkills.${index}.writing`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Dil Bilgisi Sil */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updatedSkills = [...values.languageSkills];
                                                        updatedSkills.splice(index, 1);
                                                        setFieldValue("languageSkills", updatedSkills);
                                                        setFormData({
                                                            ...formData,
                                                            languageSkills: updatedSkills,
                                                        });
                                                        remove(index);
                                                    }}
                                                    className="text-red-500 text-sm mt-2 underline hover:text-red-700"
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        ))}

                                        {/* Yeni Dil Ekle */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updatedSkills = [
                                                    ...values.languageSkills,
                                                    {
                                                        language: "",
                                                        speaking: "",
                                                        understanding: "",
                                                        writing: "",
                                                    },
                                                ];
                                                // setFieldValue("languageSkills", updatedSkills);
                                                setFormData({
                                                    ...formData,
                                                    languageSkills: updatedSkills,
                                                });
                                                push({
                                                    language: "",
                                                    speaking: "",
                                                    understanding: "",
                                                    writing: "",
                                                });
                                            }}
                                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600"
                                        >
                                            Yeni Dil Ekle
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
