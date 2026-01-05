import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numbersOfPage = Math.ceil(total / perPage);
  const pageArray = getNumbers(1, numbersOfPage);

  const isFirstItem = currentPage === 1;
  const isLastItem = currentPage === pageArray.length;

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: isFirstItem,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstItem}
            onClick={() => {
              if (!isFirstItem) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pageArray.map(n => (
          <li
            className={classNames('page-item', { active: n === currentPage })}
            key={n}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${n}`}
              onClick={() => {
                if (n !== currentPage) {
                  onPageChange(n);
                }
              }}
            >
              {n}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: isLastItem,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastItem}
            onClick={() => {
              if (!isLastItem) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
