import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export function Home() {
  return (
    <div className="flex items-center justify-center flex-col text-center mt-24 align-middle">
      <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-dark-blue">Welcome to GRD Database</h1>
      <Card className="mt-12 w-72 flex">
        <CardBody>
          <BookOpenIcon className="mx-auto text-blue-500 w-12 h-12 mb-4" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Book List
          </Typography>
          <Typography>Our collection Books, with various categories</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link to="/book" className="inline-block">
            <Button size="sm" variant="text" className="flex items-center gap-2">
              See More
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
