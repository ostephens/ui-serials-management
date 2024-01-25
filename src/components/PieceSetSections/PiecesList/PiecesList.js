import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { Row, Col, MultiColumnList } from '@folio/stripes/components';

const propTypes = {
  pieceSet: PropTypes.object,
  id: PropTypes.string,
};

// FIXME COMBINED PIECES TRANSLATION
const PiecesList = ({ pieceSet, id }) => {
  const formatter = {
    issueCount: (e) => {
      return e.rowIndex + 1;
    },
    publicationDate: (e) => {
      if (e?.recurrencePieces) {
        return (
          <>
            <FormattedDate value={e?.recurrencePieces[0].date} />
            <br />
            {`Combined pieces: ${e?.recurrencePieces.length}`}
          </>
        );
      }
      return <FormattedDate value={e?.date} />;
    },
    label: (e) => {
      return e?.label;
    },
  };

  return (
    <div id={id}>
      <Row start="xs">
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              issueCount: (
                <FormattedMessage id="ui-serials-management.pieceSets.issueCount" />
              ),
              publicationDate: (
                <FormattedMessage id="ui-serials-management.pieceSets.publicationDate" />
              ),
              label: (
                <FormattedMessage id="ui-serials-management.pieceSets.label" />
              ),
              generatedInReceiving: (
                <FormattedMessage id="ui-serials-management.pieceSets.generatedInReceiving" />
              ),
            }}
            contentData={pieceSet?.pieces.sort((a, b) => (a?.date < b?.date ? -1 : 1))}
            formatter={formatter}
            interactive={false}
            visibleColumns={[
              'issueCount',
              'publicationDate',
              'label',
              'generatedInReceiving',
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

PiecesList.propTypes = propTypes;

export default PiecesList;