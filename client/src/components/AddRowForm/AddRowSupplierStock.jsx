import { Col, InputNumber, Row } from "antd";
import React from "react";
import TableFormSelect from "../../modules/TableForm/Input/TableFormSelect";
import { useForm } from "antd/es/form/Form";
import { Form } from "antd";
import { getMissingProductsBySupplierIdApi } from "../../services/supplier";
import { useParams } from "react-router-dom";

export default function AddRowSupplierStock({ onFinish, AddConfirmBtn }) {
  const { id } = useParams();
  const service = () => getMissingProductsBySupplierIdApi(id);
  const [form] = useForm();
  return (
    <Form onFinish={onFinish} form={form} style={{ width: "100%" }}>
      <Form.Item hidden name={"id"} />
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={"name"} label="Product Name">
            <TableFormSelect
              service={service}
              form={form}
              placeholder={"Select a Product"}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item name={"stock"} label="Stock">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={5}>
          <AddConfirmBtn />
        </Col>
      </Row>
    </Form>
  );
}
