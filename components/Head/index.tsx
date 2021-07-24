import NextHead from "next/head";
import useSWR from "swr";
import { FC } from "react";

export type HeadProps = {
  title: string;
  description: string;
};

export const Head: FC<HeadProps> = ({ title, description }) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
);
