import { Head } from "../components";
import { useRouter } from "next/router";
import styles from "./upload.module.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../api/cats";
import { Typography, Paper, Box, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function Upload() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // TODO: maybe add some basic UI side file validation here.

    if (acceptedFiles.length) {
      setUploading(true);
      setErrorMessage("");
      try {
        await uploadImage(acceptedFiles[0]);
        router.push("/");
      } catch (e) {
        const error = e as Error;
        setErrorMessage(
          error && error.message ? error.message : "No message provided"
        );
      } finally {
        setUploading(false);
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });
  const closeSnack = () => setErrorMessage("");

  return (
    <div className={styles.container}>
      <Head
        title="Upload Kitty Cat"
        description="Upload a Kitty cat from your large weird collection of cat pics."
      />

      <main className={styles.main}>
        <Typography gutterBottom className={styles.title} variant="h1">
          Beam Up Kitty
        </Typography>

        {errorMessage && (
          <Box marginBottom={2}>
            <Alert onClose={closeSnack} severity="error">
              Oops, error uploading cat pic - {errorMessage}
            </Alert>
          </Box>
        )}

        {uploading && (
          <>
            <CircularProgress />
            <Typography gutterBottom paragraph>
              Beaming up...
            </Typography>
          </>
        )}

        {/* TODO: make the styling respond to drag events based upon dropzone hook props */}
        {!uploading && (
          <Paper>
            <div {...getRootProps()} className={styles.uploadContainer}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop a kitty here, or click to select one</p>
            </div>
          </Paper>
        )}
      </main>
    </div>
  );
}
