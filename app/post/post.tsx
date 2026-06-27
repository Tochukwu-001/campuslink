"use client";
import { theme } from "@/components/Styles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { HiPaperAirplane } from "react-icons/hi2";
import {
  HiOutlineDocumentText,
  HiOutlinePencilAlt,
  HiOutlineTag,
} from "react-icons/hi";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Box } from "@mui/material";
import { CiCircleCheck } from "react-icons/ci";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function PostClient({ session }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const iv = {
    title: "",
    desc: "",
    cat: "",
  };

  const validationObject = Yup.object({
    title: Yup.string()
      .required("Title is a required field")
      .min(10, "Minimum of 10 characters"),
    desc: Yup.string()
      .required("Description is a required field")
      .min(20, "Please provide a more descriptive update (min 20 characters)"),
    cat: Yup.string().required("Please select a valid category"),
  });

  return (
    <main className="min-h-screen text-slate-800 font-sans flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10">
        {/* Header Block */}
        <div className="mb-8 border-b border-slate-100 pb-5">
          <h1
            className="text-2xl font-bold tracking-tight text-slate-900"
            style={{ color: theme.primaryColor }}
          >
            Create a New Post
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Share updates, alternative teaching methods, or study resources with
            fellow students across CampusLink.
          </p>
        </div>

        <Formik
          initialValues={iv}
          validationSchema={validationObject}
          onSubmit={async (values, { resetForm }) => {
            console.log("Submitted Form Values Data:", values);
            const docRef = await addDoc(collection(db, "news"), {
              author: session?.user?.name,
              timestamp: new Date().toLocaleTimeString(),
              img: session?.user?.image,
              userId: session?.user?.id,
              ...values,
            });
            // console.log("Document written with ID: ", docRef.id);
            resetForm();
            handleOpen();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Post Title Field Container */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Post Title
                </label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 text-slate-400">
                    <HiOutlineDocumentText className="text-lg" />
                  </span>
                  <Field
                    name="title"
                    type="text"
                    placeholder="e.g., MTH 101: Visual Guide to Limits & Continuity"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                  />
                </div>
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-xs font-medium pl-1 mt-1"
                />
              </div>

              {/* Category Field Container */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Content Category
                </label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 text-slate-400 pointer-events-none">
                    <HiOutlineTag className="text-lg" />
                  </span>
                  <Field
                    name="cat"
                    as="select"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-700"
                  >
                    <option value="" disabled className="text-slate-400">
                      Choose an option...
                    </option>
                    <option value="study-resources">Study Resources</option>
                    <option value="campus-news">Campus News</option>
                    <option value="teaching-method">Teaching Method</option>
                  </Field>
                  {/* Custom dropdown arrow element */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
                <ErrorMessage
                  name="cat"
                  component="p"
                  className="text-red-500 text-xs font-medium pl-1 mt-1"
                />
              </div>

              {/* Description Textarea Container */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Post Body / Description
                </label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 text-slate-400">
                    <HiOutlinePencilAlt className="text-lg" />
                  </span>
                  <Field
                    name="desc"
                    as="textarea"
                    rows={5}
                    placeholder="Provide detailed context or copy instructions about the files or ideas you're referencing here..."
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition-all resize-none"
                  />
                </div>
                <ErrorMessage
                  name="desc"
                  component="p"
                  className="text-red-500 text-xs font-medium pl-1 mt-1"
                />
              </div>

              {/* Call to Action Button Row */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-teal-600/10 hover:shadow-xl hover:shadow-teal-600/20 text-white flex items-center justify-center gap-2 text-sm transition-all duration-200 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: theme.secondaryColor }}
                >
                  <HiPaperAirplane className="text-base transform rotate-45 -translate-y-0.5" />
                  {isSubmitting ? "Posting..." : "Make Post"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex items-center justify-center">
              <CiCircleCheck className="text-7xl text-green-600" />
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your post has been sucessfully submitted.
          </Typography>
        </Box>
      </Modal>
    </main>
  );
}
