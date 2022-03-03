/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAsset = /* GraphQL */ `
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
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
export const listAssets = /* GraphQL */ `
  query ListAssets(
    $id: ID
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAssets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const getNode = /* GraphQL */ `
  query GetNode($id: ID!) {
    getNode(id: $id) {
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
export const listNodes = /* GraphQL */ `
  query ListNodes(
    $id: ID
    $filter: ModelNodeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNodes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const nodesByStatusType = /* GraphQL */ `
  query NodesByStatusType(
    $status: NodeStatus!
    $typeCreatedAt: ModelNodeNodes_by_status_type_createdAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    nodesByStatusType(
      status: $status
      typeCreatedAt: $typeCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const nodesByOwnerStatus = /* GraphQL */ `
  query NodesByOwnerStatus(
    $owner: String!
    $statusCreatedAt: ModelNodeNodes_by_owner_status_createdAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    nodesByOwnerStatus(
      owner: $owner
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const nodesByOwnerType = /* GraphQL */ `
  query NodesByOwnerType(
    $owner: String!
    $typeCreatedAt: ModelNodeNodes_by_owner_type_createdAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    nodesByOwnerType(
      owner: $owner
      typeCreatedAt: $typeCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getEdge = /* GraphQL */ `
  query GetEdge($id: ID!) {
    getEdge(id: $id) {
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
export const listEdges = /* GraphQL */ `
  query ListEdges(
    $id: ID
    $filter: ModelEdgeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEdges(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          readers
          writers
        }
        type
        owner
        weight
        updatedAt
      }
      nextToken
    }
  }
`;
export const edgesByType = /* GraphQL */ `
  query EdgesByType(
    $type: EdgeType!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEdgeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    edgesByType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          readers
          writers
        }
        type
        owner
        weight
        updatedAt
      }
      nextToken
    }
  }
`;
