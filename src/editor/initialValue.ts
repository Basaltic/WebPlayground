import { ValueJSON, BlockJSON } from 'slate';

const initialValue: ValueJSON = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              },
            ],
          },
        ],
      } as BlockJSON,
    ],
  },
};

export default initialValue;
