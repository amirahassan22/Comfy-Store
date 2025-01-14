import React from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
// import customFetch from "../utils";
import SelectInput from "./SelectInput";
import RangeInput from "./RangeInput";
import CheckboxInput from "./CheckboxInput";

export default function Filter() {
  const {meta,params} = useLoaderData();
  const  {search,company,category,shipping,order,price} = params;
  console.log(meta);
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label={
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        }
        name="search"
        size="input-sm"
        placeholder=""
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <SelectInput
        label="Select Category"
        name="category"
        defaultValue={category}
        optionsArr={meta.categories}
        size='select-sm'
      />
      {/* Companies */}
      <SelectInput
        label="Select Company"
        name="company"
        defaultValue={company}
        optionsArr={meta.companies}
        size='select-sm'
      />
      {/* Sort by */}
      <SelectInput
        label="Sort by"
        name="order"
        defaultValue={order}
        optionsArr={["a-z", "z-a", "high", "low"]}
        size='select-sm'
      />
      {/* price range */}
      <RangeInput name='price' label='Select Price' size='range-sm' price={price} />
      {/* shipping */}
      <CheckboxInput name='shipping' label='Free Shipping' size='checkbox-sm' defaultValue={shipping}/>
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
}
