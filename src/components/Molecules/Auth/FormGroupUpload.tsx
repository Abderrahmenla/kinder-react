import Image from 'next/image';
import { assets } from '@/config/assets';
import {
  FormGroupContainer,
  Label,
  Sup,
  FormErr,
  FormRow,
  Input,
  FormUplField,
  FormUplInfo,
  FormUplIcon,
  FormUplTxt,
  FormUplArea,
  FormUplAreaWrap
} from './FormGroupUploadStyle';

interface FormGroupProps {
  label?: string;
  important?: boolean;
  errorMsg?: string;
  type: string;
  name: string;
  value?: string;
  onChange?: (value: any) => void;
  onFocus?: (value: any) => void;
  onBlur?: (value: any) => void;
  handleRemoveFile: () => void;
  placeholder: string;
  id?: string;
  style?: React.CSSProperties;
  file?: File | null;
}

const FormGroupUpload: React.FC<FormGroupProps> = ({
  label,
  important,
  errorMsg,
  file,
  handleRemoveFile,
  style,
  ...props
}) => {
  return (
    <FormGroupContainer style={style}>
      <Label htmlFor={label}>
        {label}
        {important && <Sup>*</Sup>}
      </Label>
      <FormRow>
        <div style={{ position: 'relative' }}>
          <Input
            errMsg={errorMsg}
            accept=".png, .jpeg, .jpg, .pdf, .doc, .heic"
            disabled={Boolean(file)}
            {...props}
          />
          <FormUplField>
            <FormUplInfo style={file ? { display: 'none' } : { display: 'flex' }}>
              <FormUplIcon>
                <Image
                  src={`${assets}/images/upload.svg`}
                  width={18}
                  height={18}
                  alt="upload"
                  style={{ height: 'auto' }}
                />
              </FormUplIcon>
              <span>Choose a File</span>
            </FormUplInfo>
            <FormUplTxt style={file ? { display: 'none' } : { display: 'flex' }}>
              Please upload files in PNG, JPEG, JPG, PDF, DOC or HEIC format
            </FormUplTxt>
            <FormUplArea hasFile={Boolean(file)}>
              <FormUplAreaWrap>
                <FormUplIcon>
                  <Image
                    src={`${assets}/images/upload-file.svg`}
                    alt="upload"
                    width={18}
                    height={18}
                    style={{ height: 'auto' }}
                  />
                </FormUplIcon>
                <span>{file?.name.slice(0, 9) || ''}</span>

                <FormUplIcon>
                  <Image
                    src={`${assets}/images/upload-cancel.svg`}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveFile();
                    }}
                    alt="upload"
                    style={{
                      marginLeft: '10px',
                      alignSelf: 'center',
                      height: 'auto'
                    }}
                    width={18}
                    height={18}
                  />
                </FormUplIcon>
              </FormUplAreaWrap>
            </FormUplArea>
          </FormUplField>
        </div>
        {errorMsg && (
          <FormErr>
            <span role="alert">{errorMsg}</span>
          </FormErr>
        )}
      </FormRow>
    </FormGroupContainer>
  );
};

export default FormGroupUpload;
