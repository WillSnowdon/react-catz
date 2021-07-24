import { Head } from "../components";
import { useRouter } from "next/router";
import styles from "./upload.module.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../api/cats";
import { Typography, Box } from "@material-ui/core";

export default function Upload() {
  const router = useRouter();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      try {
        await uploadImage(acceptedFiles[0]);
        router.push("/");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div className={styles.container}>
      <Head
        title="Upload Kitty Cat"
        description="Upload a Kitty Cat from your large weird collection of cat pics."
      />

      <main className={styles.main}>
        <Box marginBottom="3rem">
          <Typography className={styles.title} variant="h1">
            Beam Up Kitty
          </Typography>
        </Box>
        <div {...getRootProps()} className={styles.uploadContainer}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </main>
    </div>
  );
}
