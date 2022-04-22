import { Checkbox, Form, Input, Select } from 'antd';
import { validateMessages } from 'constant/validateMessages';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import Utils from 'utils';
import MonthYearSelect from '../../MonthYearSelect';
import DegreeSelect from '../DegreeSelect';
import MajorSelect from '../MajorSelect';
import UniversitySelect from '../UniversitySelect';

const { TextArea } = Input;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
interface IProps {
  education?: Education;
  onSubmit?: (values: Education) => void;
}
const NewEducationForm = React.forwardRef<any, IProps>(({ onSubmit, education }, ref) => {
  const [form] = Form.useForm();

  const [isPresent, setIsPresent] = useState(education?.isPresent);
  useImperativeHandle(ref, () => ({
    submit() {
      form.submit();
    },
    resetFields() {
      form.resetFields();
    },
  }));
  useEffect(() => form.resetFields(), [education]);
  useEffect(() => {
    setIsPresent(education?.isPresent);
  }, [education?.isPresent]);
  const onFinish = (data: any) => {
    data.startDate = Utils.convertMonthYearToDate(data.startDate);
    data.endDate = !data.isPresent ? Utils.convertMonthYearToDate(data.endDate) : undefined;
    onSubmit?.(data);
  };
  const onIsPresentChange = (value: boolean) => {
    setIsPresent(value);
  };

  return (
    <Form
      {...layout}
      form={form}
      labelAlign='left'
      validateMessages={validateMessages}
      onFinish={onFinish}
      initialValues={{
        ...education,
        startDate: Utils.convertReverseMonthYearToDate(education?.startDate),
        endDate: Utils.convertReverseMonthYearToDate(education?.endDate),
      }}
    >
      <Form.Item
        label='Instituation'
        name='school'
        rules={[
          {
            required: true,
          },
        ]}
        required={false}
      >
        <UniversitySelect />
      </Form.Item>

      <Form.Item
        label='Degree'
        name='degree'
        rules={[
          {
            required: true,
          },
        ]}
        required={false}
      >
        <DegreeSelect />
      </Form.Item>
      <Form.Item
        label='Field of Study'
        name='fieldStudy'
        rules={[
          {
            required: true,
          },
        ]}
        required={false}
      >
        <MajorSelect />
      </Form.Item>
      <Form.Item
        label='Start Date'
        name='startDate'
        rules={[
          {
            required: true,
          },
        ]}
        required={false}
      >
        <MonthYearSelect />
      </Form.Item>
      <Form.Item
        label='End Date'
        name='endDate'
        rules={[
          {
            required: !isPresent,
          },
        ]}
        required={false}
      >
        <MonthYearSelect disabled={isPresent} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} name='isPresent' valuePropName='checked'>
        <Checkbox onChange={(e) => onIsPresentChange(e.target.checked)}>
          I{"'"}m currently studying
        </Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} required={false} name='notes'>
        <TextArea rows={5} placeholder='Additional information (optional)' />
      </Form.Item>
    </Form>
  );
});
NewEducationForm.displayName = 'NewEducationForm';
export default NewEducationForm;
