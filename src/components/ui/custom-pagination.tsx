import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface CustomPaginationProps {
  count: number;
  pageSize: number;
  page: number;
  onPageChange: (details: { page: number }) => void;
}

const CustomPagination = ({ count, pageSize, page, onPageChange }: CustomPaginationProps) => {
  return (
    <Pagination.Root count={count} pageSize={pageSize} page={page} onPageChange={onPageChange}>
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Items render={(page) => <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>{page.value}</IconButton>} />
        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default CustomPagination;
