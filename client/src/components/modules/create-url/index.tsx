import { Button, DatePicker, Form, Input } from "antd";
import { createShortUrl } from "../../../store/slice/url.slice";
import { IPostUrl } from "../../../types/url.interface";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";

const CreateUrlForm = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const fetchCheck = useAppSelector((state) => state.url.fetchCheck);

  const onFinish = (data: IPostUrl) => {
    dispatch(createShortUrl(data));
    handleClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [fetchCheck]);

  return (
    <Form
      form={form}
      name="wrap"
      labelCol={{ flex: "110px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item label="Адрес" name="originalUrl" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Короткий адрес" name="alias">
        <Input />
      </Form.Item>

      <Form.Item label="Срок истечения" name="expiresAt">
        <DatePicker />
      </Form.Item>

      <Form.Item label="">
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUrlForm;
