import * as Yup from 'yup';

interface AsyncValidationRule {
  name: string;
  message: Yup.TestOptionsMessage;
  test: (value: string) => Promise<boolean> | boolean;
}

export class AsyncValidator {
  private readonly preSchema: Yup.Schema<any>;
  private readonly asyncTest: AsyncValidationRule;

  private previousValue?: string;
  private previousResult = false;

  constructor(preSchema: Yup.Schema<any>, asyncTest: AsyncValidationRule) {
    this.preSchema = preSchema;
    this.asyncTest = asyncTest;
  }

  private validate = async (value: string): Promise<boolean> => {
    let result;
    if (!(await this.preSchema.isValid(value))) {
      result = false;
    } else if (value === this.previousValue) {
      result = this.previousResult;
    } else {
      this.previousValue = value;
      result = await this.asyncTest.test(value);
    }
    this.previousResult = result;
    return result;
  };

  check = (): Yup.Schema<any> => {
    return this.preSchema.concat(Yup.string().test(this.asyncTest.name, this.asyncTest.message, this.validate));
  };
}
