"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button, Card, Col, Pagination, Row, Typography } from "antd";
import Link from "next/link";
import { Paper } from "../components";

export default function NextPage() {
  const { modelArr, getAllModel } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const savedYear = localStorage.getItem("year");
  const savedMake = localStorage.getItem("make");

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const currentModels = modelArr.slice(startIndex, endIndex);

  const handleChangeQuestionariesParams = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setLimit(pageSize);
  };

  useEffect(() => {
    if (savedYear && savedMake) {
      getAllModel(savedMake, savedYear);
    }
  }, [savedYear, savedMake]);

  const handleBackButton = () => {
    localStorage.removeItem('make');
    localStorage.removeItem('year');
  }

  return (
    <Paper className="mt-32">
      <Row gutter={[16, 16]} justify="start">
        <Col span={24}>
          <Link href="/">
            <Button onClick={() => handleBackButton} type="primary">Back</Button>
          </Link>
        </Col>

        {currentModels.length >= 0 ? (
          currentModels.map((item) => (
            <Col key={item.Model_ID} span={8} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card title={item.Model_Name} hoverable style={{ height: 240 }}>
                <Typography.Text>Make Name: {item.Make_Name}</Typography.Text>
                <br />
                <Typography.Text>Model Name: {item.Model_Name}</Typography.Text>
              </Card>
            </Col>
          ))
        ) : (
          <Typography.Text>No models available.</Typography.Text>
        )}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={limit}
        total={modelArr.length}
        showQuickJumper
        showSizeChanger
        onChange={handleChangeQuestionariesParams}
        style={{ marginTop: 12 }}
      />
    </Paper>
  );
}
