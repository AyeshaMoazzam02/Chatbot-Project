import React, { useEffect, useState } from "react";
import Header from "@/layouts/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { uploadFiles } from "@/services/authServices";
import { FeaturesSection } from "./components";

const FilesUploadPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("userToken");
    if (!isAuth || isAuth === null) {
      navigate("/");
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    if (selectedFiles.length !== pdfFiles.length) {
      toast.error("Only PDF files are allowed.");
    }

    setFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    if (droppedFiles.length !== pdfFiles.length) {
      toast.error("Only PDF files are allowed.");
    }

    setFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
  };

  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    toast.success("File deleted successfully.");
  };

  const handleAddFileUrl = () => {
    if (!currentUrl) {
      toast.error("Please enter a URL.");
      return;
    }
    if (!currentUrl.endsWith(".pdf")) {
      toast.error("Only PDF URLs are allowed.");
      return;
    }

    setFileUrls((prevUrls) => [...prevUrls, currentUrl]);
    setCurrentUrl(""); // Clear the input field
  };

  const handleDeleteFileUrl = (index: number) => {
    setFileUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    toast.success("URL deleted successfully.");
  };

  const handleUploadToDatabase = async () => {
    if (files.length === 0 && fileUrls.length === 0) {
      toast.error("Please upload at least one PDF file or provide a URL.");
      return;
    }

    try {
      const formData = new FormData();

      // Append uploaded files
      files.forEach((file) => {
        formData.append("files", file);
      });

      // Append URLs
      fileUrls.forEach((url) => {
        formData.append("file_urls", url);
      });

      await uploadFiles(formData);
      toast.success("Files uploaded successfully!");
      navigate("/chatbot");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center">
        <div className={styles["title"]}>
          <div className={styles["title-text-and-image"]}>
            <img src="/pdfs.png" alt="PDF Icon" />
            <h1>ChatPDF Online</h1>
          </div>
          <p>
            Use the AI capabilities provided by this tool to help read and
            understand your PDFs better.
          </p>
        </div>

        <div className="bg-gray-100  rounded-2xl w-[800px]">
          <div className={styles["banner-image"]}>
            <img src="/pdf_logo.png" />
            <img src="/chat_logo.svg" />
          </div>

          <div className="flex flex-col items-center mt-10">
            <div
              className="w-[400px] h-12 flex flex-col items-center justify-center text-white bg-purple-600 rounded-lg cursor-pointer"
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <p className="text-center"> Click or drag here to upload</p>
              </label>
            </div>

            <div className="mt-4 w-[400px] flex items-center">
              <input
                type="text"
                placeholder="Paste a PDF URL here"
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                className="border rounded-l-lg p-2 flex-grow"
              />
              <button
                className="bg-gray-500 text-white px-4 rounded-r-xl"
                onClick={handleAddFileUrl}
              >
                Add URL
              </button>
            </div>

            <p>File types supported: PDF ｜ Max file size: 50MB</p>
            <p>Max Token: 100K (Approximately 70,000 words or characters)</p>

            {/* List of Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-6 w-full max-w-lg">
                <h2 className="text-lg font-semibold">Uploaded Files:</h2>
                <ul className="list-disc list-inside text-left">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{file.name}</span>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => handleDeleteFile(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* List of File URLs */}
            {fileUrls.length > 0 && (
              <div className="mt-6 w-full max-w-lg">
                <h2 className="text-lg font-semibold">Uploaded URLs:</h2>
                <ul className="list-disc list-inside text-left">
                  {fileUrls.map((url, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{url}</span>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => handleDeleteFileUrl(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              className="bg-[#426592] text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
              onClick={handleUploadToDatabase}
            >
              Go to Chatbot
            </button>
          </div>
        </div>
      </div>

      <FeaturesSection />
    </div>
  );
};

export default FilesUploadPage;
