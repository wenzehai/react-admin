import React, {Component} from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd'

const {Option} = Select.Option
const AutoCompleteOption = AutoComplete.Option

const residences = [
  {
    value: 'zhejiang',
    label: 'Hangzhou',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ]
      }
    ]
  }
];


class RegistrationForm extends React.Component {
  state = {
    confirmDity: false,
    autoCompleteResult: []
  };

  // submit validate
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  };

  // blur
  handleConfirmBlur = e => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDity || !!value})
  }


  // compareToFirstPassword
  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    console.log('rule', rule);
    console.log('value', value);
    const {form} = this.props;
    if (value && this.state.confirmDity) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
    }
    this.setState({autoCompleteResult: autoCompleteResult})
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {autoCompleteResult} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8
        }
      },
    };

    const prefixSelector = (
      <Select style={{width: 70}}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="email">
          {
            getFieldDecorator('email', {
              rules: [
                {type: 'email', message: '请输入正确的邮箱格式！'},
                {required: true, message: '请输入邮箱！'},
              ]
            })(
              <Input/>
            )
          }
        </Form.Item>
        <Form.Item label="Password">
          {
            getFieldDecorator('password', {
              rules: [
                {required: true, message: '请输入密码！'},
                {validator: this.validateToNextPassword},
              ]
            })(
              <Input.Password/>
            )
          }

        </Form.Item>
        <Form.Item label="Confirm password" hasFeedback>
          {
            getFieldDecorator('confirm', [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ])(
              <Input.Password onBlur={this.handleConfirmBlur}/>
            )
          }

        </Form.Item>
        <Form.Item label={
          <span>
            Nickname &nbsp;
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o"/>
            </Tooltip>
          </span>
        }>
          {
            getFieldDecorator('nickname', {
              rules: [
                {required: true, message: 'Please input your nickname!', whitespace: true}
              ]
            })(
              <Input/>
            )
          }
        </Form.Item>
        <Form.Item label="Habitual Residence">
          {
            getFieldDecorator('residence', {
              initialValue: ['zhejiang', 'hangzhou', 'xihu'],
              rules: [
                {type: 'array', required: true, message: 'Please select your habitual residence!'},
              ]
            })(<Cascader options={residences}/>)
          }

        </Form.Item>

        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{required: true, message: 'Please input your phone number!'}],
          })(<Input
            addonBefore={<Select style={{width: 70}}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>}
            style={{width: '100%'}}/>)}
        </Form.Item>

        <Form.Item label="Website">
          {
            getFieldDecorator('website', {
              rules: [{required: true, message: 'Please input website!'}],
            })(
              <AutoComplete dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
              >
                <Input/>
              </AutoComplete>,
            )
          }
        </Form.Item>

        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{required: true, message: 'Please input the captcha you got!'}]
              })(<Input/>)}
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {
            getFieldDecorator('argument', {
              valuePropName: 'checked'
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            )
          }

        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
        </Form.Item>
      </Form>

    )
  }
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

export default WrappedRegistrationForm;