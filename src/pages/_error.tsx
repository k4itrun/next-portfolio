import { ErrorProps, Errors } from "@/interfaces";
import { metaConfig } from "@k4itrunconfig";
import { useRouter } from "next/router";
import Button from "@/components/client/Button";
import { NextPageContext } from "next";

export default function Error({ statusCode }: ErrorProps) {
  const errors: Errors = metaConfig.errors || {};
  const router = useRouter();

  const redirect = () => router.push("/");

  return (
    <div className="flex flex-col items-center justify-center py-56 space-y-6">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-color-layout to-white">
        {statusCode}
      </h1>
      <p className="text-2xl text-gray-500 dark:text-gray-500">
        {errors[statusCode] || "An unexpected error occurred."}
      </p>
      <Button onClick={redirect} className="mt-4" state="default">
        <span className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-black dark:text-white transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-black dark:text-white transition-colors duration-200">
            Return to main page
          </span>
        </span>
      </Button>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};
