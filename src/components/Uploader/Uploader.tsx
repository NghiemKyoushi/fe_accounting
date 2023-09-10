import React, { useState, useRef } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import styles from "./Uploader.module.scss";

export interface UploadProps {
  handleSaveImage: (e: any) => void;
  handleDeleteImage: () => void;
  isImageId: boolean;
}
const Uploader = (props: UploadProps) => {
  const { handleSaveImage, handleDeleteImage, isImageId } = props;
  const [files, setFiles] = useState<File[] | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  const getFileNames = () =>
    files?.reduce(
      (fileNames, file) =>
        `${fileNames} ${fileNames !== "" ? "," : ""} ${file.name}`,
      ""
    ) || "";
  const handleRemoveFile = () => {
    handleDeleteImage();
    setFiles(null);
  };
  return (
    <div className={styles.form_container}>
      <div style={{ height: 26, padding: "0px 6px", margin: "1px 0px" }}>
        {!isImageId ? (
          <Button
            size="small"
            variant="contained"
            onClick={() => handleSaveImage(files)}
          >
            Lưu
          </Button>
        ) : (
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => handleRemoveFile()}
          >
            Xóa
          </Button>
        )}
      </div>
      <Box position="relative" height={43} width="20%">
        <Box position="absolute" width="100%">
          <TextField
            fullWidth
            size="small"
            disabled={isImageId}
            style={{
              backgroundColor: "transparent",
            }}
            label="Tải ảnh chứng từ"
            value={getFileNames()}
            required
            sx={{ pointerEvents: "none" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AttachFile />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          component="label"
          onKeyDown={(e) => e.key === "32" && ref.current?.click()}
          fullWidth
          size="small"
          sx={{ height: "89%" }}
          style={{
            padding: "0px 6px",
            margin: "1px 0px",
            backgroundColor: "transparent",
          }}
        >
          <input
            disabled={isImageId}
            ref={ref}
            type="file"
            onChange={handleChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </Button>
      </Box>
    </div>
  );
};

export default Uploader;
