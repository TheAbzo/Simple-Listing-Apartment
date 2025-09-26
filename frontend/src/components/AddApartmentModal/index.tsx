"use client";

import { useState } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import { Apartment } from "@/types/apartment";

interface Props {
  onAdded: (newApartment: Apartment) => void;
}

export default function AddApartmentModal({ onAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await axios.post<Apartment>(
        "http://localhost:4000/api/apartments",
        values
      );

      onAdded(response.data);
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: "1rem" }}>
        Add Apartment
      </Button>
      <Modal
        title="Add Apartment"
        open={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="unitName" label="Unit Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="unitNumber" label="Unit Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectName" label="Project Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="bedrooms" label="Bedrooms" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="bathrooms" label="Bathrooms" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="area" label="Area (sqm)" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
