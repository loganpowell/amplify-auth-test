/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAsset = /* GraphQL */ `
  mutation CreateAsset(
    $input: CreateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    createAsset(input: $input, condition: $condition) {
      id
      name
      nodeID
      createdAt
      updatedAt
      type
      index
      owner
      content
      editors
    }
  }
`;
export const updateAsset = /* GraphQL */ `
  mutation UpdateAsset(
    $input: UpdateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    updateAsset(input: $input, condition: $condition) {
      id
      name
      nodeID
      createdAt
      updatedAt
      type
      index
      owner
      content
      editors
    }
  }
`;
export const deleteAsset = /* GraphQL */ `
  mutation DeleteAsset(
    $input: DeleteAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    deleteAsset(input: $input, condition: $condition) {
      id
      name
      nodeID
      createdAt
      updatedAt
      type
      index
      owner
      content
      editors
    }
  }
`;
export const createNode = /* GraphQL */ `
  mutation CreateNode(
    $input: CreateNodeInput!
    $condition: ModelNodeConditionInput
  ) {
    createNode(input: $input, condition: $condition) {
      id
      name
      type
      status
      createdAt
      updatedAt
      owner
      assets {
        items {
          id
          name
          nodeID
          createdAt
          updatedAt
          type
          index
          owner
          content
          editors
        }
        nextToken
      }
      objects {
        items {
          id
          createdAt
          objectID
          subjectID
          type
          owner
          weight
          updatedAt
        }
        nextToken
      }
      subjects {
        items {
          id
          createdAt
          objectID
          subjectID
          type
          owner
          weight
          updatedAt
        }
        nextToken
      }
      readers
      writers
    }
  }
`;
export const updateNode = /* GraphQL */ `
  mutation UpdateNode(
    $input: UpdateNodeInput!
    $condition: ModelNodeConditionInput
  ) {
    updateNode(input: $input, condition: $condition) {
      id
      name
      type
      status
      createdAt
      updatedAt
      owner
      assets {
        items {
          id
          name
          nodeID
          createdAt
          updatedAt
          type
          index
          owner
          content
          editors
        }
        nextToken
      }
      objects {
        items {
          id
          createdAt
          objectID
          subjectID
          type
          owner
          weight
          updatedAt
        }
        nextToken
      }
      subjects {
        items {
          id
          createdAt
          objectID
          subjectID
          type
          owner
          weight
          updatedAt
        }
        nextToken
      }
      readers
      writers
    }
  }
`;
export const deleteNode = /* GraphQL */ `
  mutation DeleteNode(
    $input: DeleteNodeInput!
    $condition: ModelNodeConditionInput
  ) {
    deleteNode(input: $input, condition: $condition) {
      id
      name
      type
      status
      createdAt
      updatedAt
      owner
      assets {
        items {
          id
          name
          nodeID
          createdAt
          updatedAt
          type
          index
          owner
          content
          editors
        }
        nextToken
      }
      objects {
        items {
          id
          createdAt
          objectID
          subjectID
          type
          owner
          weight
          updatedAt
        }
        nextToken
      }
      subjects {
        items {
          id
          createdAt
          objectID
          subjectID
          type
          owner
          weight
          updatedAt
        }
        nextToken
      }
      readers
      writers
    }
  }
`;
export const createEdge = /* GraphQL */ `
  mutation CreateEdge(
    $input: CreateEdgeInput!
    $condition: ModelEdgeConditionInput
  ) {
    createEdge(input: $input, condition: $condition) {
      id
      createdAt
      objectID
      subjectID
      object {
        id
        name
        type
        status
        createdAt
        updatedAt
        owner
        assets {
          nextToken
        }
        objects {
          nextToken
        }
        subjects {
          nextToken
        }
        readers
        writers
      }
      subject {
        id
        name
        type
        status
        createdAt
        updatedAt
        owner
        assets {
          nextToken
        }
        objects {
          nextToken
        }
        subjects {
          nextToken
        }
        readers
        writers
      }
      type
      owner
      weight
      updatedAt
    }
  }
`;
export const updateEdge = /* GraphQL */ `
  mutation UpdateEdge(
    $input: UpdateEdgeInput!
    $condition: ModelEdgeConditionInput
  ) {
    updateEdge(input: $input, condition: $condition) {
      id
      createdAt
      objectID
      subjectID
      object {
        id
        name
        type
        status
        createdAt
        updatedAt
        owner
        assets {
          nextToken
        }
        objects {
          nextToken
        }
        subjects {
          nextToken
        }
        readers
        writers
      }
      subject {
        id
        name
        type
        status
        createdAt
        updatedAt
        owner
        assets {
          nextToken
        }
        objects {
          nextToken
        }
        subjects {
          nextToken
        }
        readers
        writers
      }
      type
      owner
      weight
      updatedAt
    }
  }
`;
export const deleteEdge = /* GraphQL */ `
  mutation DeleteEdge(
    $input: DeleteEdgeInput!
    $condition: ModelEdgeConditionInput
  ) {
    deleteEdge(input: $input, condition: $condition) {
      id
      createdAt
      objectID
      subjectID
      object {
        id
        name
        type
        status
        createdAt
        updatedAt
        owner
        assets {
          nextToken
        }
        objects {
          nextToken
        }
        subjects {
          nextToken
        }
        readers
        writers
      }
      subject {
        id
        name
        type
        status
        createdAt
        updatedAt
        owner
        assets {
          nextToken
        }
        objects {
          nextToken
        }
        subjects {
          nextToken
        }
        readers
        writers
      }
      type
      owner
      weight
      updatedAt
    }
  }
`;
