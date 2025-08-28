"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Upload, FileDown } from "lucide-react";
import { usePatient } from "@/features/patients/usePatientAction";

export default function ExcelUploadDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { bulkCreatePatients } = usePatient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try{

        await bulkCreatePatients(file)
    }catch(error){

    }finally{
        setOpen(false);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/assets/file/patient-upload-template.xlsx";
    link.download = "Patient_Template.xlsx";
    link.click();
  };

  return (
    <>
      {/* Trigger button */}
      <Button onClick={() => setOpen(true)} variant="outline">
        <Upload className="w-4 h-4 mr-2" /> Import Patients
      </Button>

      {/* Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload file</DialogTitle>
          </DialogHeader>

          {/* Drag & Drop + Choose */}
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2">
            <Upload className="w-10 h-10 text-gray-500" />
            <p className="text-sm text-gray-600">
              Drag & Drop file here or{" "}
              <label className="text-blue-600 cursor-pointer">
                Choose file
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: XLS, XLSX, CSV | Max size: 25 MB
            </p>
          </div>

          {/* Show selected file */}
          {file && (
            <p className="text-sm text-gray-700 mt-2">
              Selected: <strong>{file.name}</strong>
            </p>
          )}

          {/* Template Download */}
          <div className="flex items-center justify-between mt-4 border p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <FileDown className="w-5 h-5 text-green-600" />
              <span className="text-sm">Template file</span>
            </div>
            <Button size="sm" variant="outline" onClick={handleDownloadTemplate}>
              Download
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!file}>
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
