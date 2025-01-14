import PropTypes from 'prop-types';

import { Field } from 'react-final-form';

import {
  Row,
  Col,
  Select,
  TextField,
  IconButton,
} from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

import { ENUMERATION_NUMBER_FORMAT } from '../../../constants/selectOptionTranslations';

const [ENUMERATION_FORMAT, ENUMERATION_SEQUENCE] = [
  'EnumerationNumericLevelTMRF.Format',
  'EnumerationNumericLevelTMRF.Sequence',
];

const EnumerationNumericField = ({ items, name, index, level, onDeleteField }) => {
  const refdataValues = useSerialsManagementRefdata([
    ENUMERATION_FORMAT,
    ENUMERATION_SEQUENCE,
  ]);
  return (
    <>
      <Row>
        <Col xs={1}>{index + 1}</Col>
        <Col xs={2}>
          <Field component={TextField} name={`${name}.units`} />
        </Col>
        <Col xs={2}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              ...selectifyRefdata(
                refdataValues,
                ENUMERATION_FORMAT,
                'value'
              )?.map((o) => {
                return {
                  value: o?.value,
                  label: ENUMERATION_NUMBER_FORMAT?.find(
                    (e) => e?.value === o?.value
                  )?.label,
                };
              }),
            ]}
            name={`${name}.format.value`}
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={2}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              ...selectifyRefdata(refdataValues, ENUMERATION_SEQUENCE, 'value'),
            ]}
            name={`${name}.sequence.value`}
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field component={TextField} name={`${name}.internalNote`} />
        </Col>
        {items?.length > 1 && (
          <Col xs={2}>
            <IconButton
              icon="trash"
              onClick={() => onDeleteField(index, level)}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

EnumerationNumericField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  index: PropTypes.string,
  level: PropTypes.object,
  onDeleteField: PropTypes.func,
};

export default EnumerationNumericField;
