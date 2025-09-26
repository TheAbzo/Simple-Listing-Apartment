'use client';

import { useState } from 'react';
import { Modal, Button, Form, Input, InputNumber } from 'antd';
import { toast } from 'react-hot-toast';
import { Apartment } from '@/types/apartment';
import { createApartment } from '@/services/apartment.service';
import styles from './addApartmentModal.module.scss';

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

      const newApartment = await createApartment(values);

      onAdded(newApartment);
      setOpen(false);
      form.resetFields();
      toast.success('Apartment added successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.error?.message || 'Failed to add apartment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Apartment
      </Button>

      <Modal
        title="Add Apartment"
        open={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
        confirmLoading={loading}
        centered
        okText="OK"
        cancelText="Cancel"
        width={500}
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
            <InputNumber className={styles.fullWidthInput} />
          </Form.Item>

          <Form.Item name="bedrooms" label="Bedrooms" rules={[{ required: true }]}>
            <InputNumber className={styles.fullWidthInput} />
          </Form.Item>

          <Form.Item name="bathrooms" label="Bathrooms" rules={[{ required: true }]}>
            <InputNumber className={styles.fullWidthInput} />
          </Form.Item>

          <Form.Item name="area" label="Area (sqm)" rules={[{ required: true }]}>
            <InputNumber className={styles.fullWidthInput} />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
