import { Head } from "../components";
import { useRouter } from "next/router";
import styles from "./upload.module.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../api/cats";
import { Typography, Snackbar, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function Upload() {
  const [showErrorSnack, setShowErrorSnack] = useState(false);
  const router = useRouter();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      try {
        await uploadImage(acceptedFiles[0]);
        router.push("/");
      } catch (e) {
        setShowErrorSnack(true);
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });
  const closeSnack = () => setShowErrorSnack(false);

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

        {/* TODO: make the styling respond to drag events based upon dropzone hook props */}
        <Paper>
          <div {...getRootProps()} className={styles.uploadContainer}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a kitty here, or click to select one</p>
          </div>
        </Paper>

        <Snackbar
          open={showErrorSnack}
          autoHideDuration={6000}
          onClose={closeSnack}
        >
          <Alert onClose={closeSnack} severity="error">
            Oops, error updating cat pic. Please try another.
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
}
