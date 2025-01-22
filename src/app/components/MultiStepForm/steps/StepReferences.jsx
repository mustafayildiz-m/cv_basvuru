"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

export default function StepReferences({ onPrevious, onNext, formData, setFormData }) {
    const validationSchema = Yup.object({
        references: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required("Ad zorunludur"),
                    institution: Yup.string().required("Kurum zorunludur"),
                    contact: Yup.string().required("İletişim bilgisi zorunludur"),
                })
            )
            .min(1, "En az bir referans eklemelisiniz"),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Referanslar
                </h2>
            </div>
                <Formik
                    initialValues={{
                        references: formData.references || [
                            {name: "", institution: "", contact: ""},
                        ],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const updatedFormData = {...formData, references: values.references};
                        setFormData(updatedFormData); // Merkezi form verisini güncelle
                        onNext(updatedFormData); // Sonraki adıma geç
                    }}
                >
                    {({values, setFieldValue, isSubmitting}) => (
                        <Form className="space-y-6">
                            <FieldArray name="references">
                                {({remove, push}) => (
                                    <div>
                                        {values.references.map((reference, index) => (
                                            <div
                                                key={index}
                                                className="border p-4 mb-4 rounded-lg shadow-sm"
                                            >
                                                {/* Ad */}
                                                <div>
                                                    <label
                                                        htmlFor={`references.${index}.name`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Ad
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`references.${index}.name`}
                                                        placeholder="Ad"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `references.${index}.name`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                references: values.references,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`references.${index}.name`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Kurum */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`references.${index}.institution`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Kurum
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`references.${index}.institution`}
                                                        placeholder="Kurum"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `references.${index}.institution`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                references: values.references,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`references.${index}.institution`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* İletişim */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`references.${index}.contact`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        İletişim
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`references.${index}.contact`}
                                                        placeholder="İletişim"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `references.${index}.contact`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                references: values.references,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`references.${index}.contact`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Referans Sil */}
                                                {values.references.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            remove(index);
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                references: values.references,
                                                            }));
                                                        }}
                                                        className="text-red-500 text-sm mt-2 underline hover:text-red-700"
                                                    >
                                                        Sil
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {/* Yeni Referans Ekle */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                push({name: "", institution: "", contact: ""});
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    references: [
                                                        ...values.references,
                                                        {name: "", institution: "", contact: ""},
                                                    ],
                                                }));
                                            }}
                                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600"
                                        >
                                            Yeni Referans Ekle
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
