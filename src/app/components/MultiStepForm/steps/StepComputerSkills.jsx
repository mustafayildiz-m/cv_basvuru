"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

export default function StepComputerSkills({ onNext, onPrevious, formData }) {
    const validationSchema = Yup.object({
        computerSkills: Yup.array().of(
            Yup.object().shape({
                programName: Yup.string().required("Program adı zorunludur"),
            })
        ),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Bilgisayar Becerileri
                </h2>
            </div>
                <Formik
                    initialValues={{
                        computerSkills: formData.computerSkills || [{programName: ""}],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onNext(values);
                    }}
                >
                    {({values, isSubmitting}) => (
                        <Form className="space-y-6">
                            <FieldArray name="computerSkills">
                                {({remove, push}) => (
                                    <div>
                                        {values.computerSkills.map((skill, index) => (
                                            <div
                                                key={index}
                                                className="border p-4 mb-4 rounded-lg shadow-sm"
                                            >
                                                {/* Program Adı */}
                                                <div>
                                                    <label
                                                        htmlFor={`computerSkills.${index}.programName`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Program Adı
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`computerSkills.${index}.programName`}
                                                        placeholder="Program Adı"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <ErrorMessage
                                                        name={`computerSkills.${index}.programName`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Beceri Sil */}
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-red-500 text-sm mt-2 underline hover:text-red-700"
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        ))}

                                        {/* Yeni Beceri Ekle */}
                                        <button
                                            type="button"
                                            onClick={() => push({programName: ""})}
                                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600"
                                        >
                                            Yeni Beceri Ekle
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
