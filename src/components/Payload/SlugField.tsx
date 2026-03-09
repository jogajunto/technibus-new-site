"use client";

import { slugify } from "@/utilities/slugify";
import { FieldLabel, TextInput, useField, useFormFields } from "@payloadcms/ui";
import React, { useEffect, useRef } from "react";

type Props = {
  path: string;
  field: {
    label?: string;
    required?: boolean;
    admin?: {
      placeholder?: string;
    };
  };
};

export default function SlugField(props: Props) {
  const { path, field } = props;

  const label = field?.label;
  const required = field?.required;
  const placeholder = field?.admin?.placeholder;

  const { value, setValue } = useField<string>({ path });

  const title = useFormFields(([fields]) => fields?.title?.value as string);

  const lastGenerated = useRef("");

  useEffect(() => {
    if (!title) return;

    const slug = slugify(title);

    if (!value || value === lastGenerated.current) {
      lastGenerated.current = slug;
      setValue(slug);
    }
  }, [title]);

  return (
    <div className="field-type" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div className="field-label">
        <FieldLabel label={label} required={required} />
      </div>

      <TextInput path={path} value={value} placeholder={placeholder} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
    </div>
  );
}
