"use client";

import { Button, Col, Row, Select } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";

export default function Home() {
  const [year, setYear] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [loadingMakes, setLoadingMakes] = useState<boolean>(false);

  const { makeArr, getAllMake } =
    useContext(GlobalContext);

  const onYear = (dateString: string) => {
    setYear(dateString);
    localStorage.setItem("year", dateString);
  };

  const onModel = (value: string) => {
    setMake(value);
    localStorage.setItem("make", value);
  };

  useEffect(() => {
    const fetchMakes = async () => {
      setLoadingMakes(true);
      await getAllMake();
      setLoadingMakes(false);
    };

    fetchMakes();
  }, []);

  const yearOptions = Array.from({ length: 2024 - 2015 + 1 }, (_, index) => {
    const year = 2015 + index;
    return {
      label: year,
      value: year,
    };
  });

  return (
    <div className="h-screen flex justify-center items-center gap-2">
      <Row gutter={12}>
        <Col>
          <Select
            style={{ width: 150 }}
            options={yearOptions}
            onSelect={onYear}
            placeholder={"select the date"} />
        </Col>
        <Col>
          <Select
            placeholder={'select the mark'}
            style={{ width: 150 }}
            loading={loadingMakes}
            options={makeArr.map((item) => ({
              value: item.Make_Name,
              label: item.Make_Name,
            }))}
            showSearch
            onChange={onModel}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Col>
      </Row>

      <Link href="/models">
        <Button
          type="primary"
          disabled={!year || !make}
        >
          Next
        </Button>
      </Link>
    </div>
  );
}
