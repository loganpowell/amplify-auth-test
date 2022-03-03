/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset($owner: String) {
    onCreateAsset(owner: $owner) {
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
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset($owner: String) {
    onUpdateAsset(owner: $owner) {
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
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset($owner: String) {
    onDeleteAsset(owner: $owner) {
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
export const onCreateNode = /* GraphQL */ `
  subscription OnCreateNode(
    $owner: String
    $readers: String
    $writers: String
  ) {
    onCreateNode(owner: $owner, readers: $readers, writers: $writers) {
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
export const onUpdateNode = /* GraphQL */ `
  subscription OnUpdateNode(
    $owner: String
    $readers: String
    $writers: String
  ) {
    onUpdateNode(owner: $owner, readers: $readers, writers: $writers) {
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
export const onDeleteNode = /* GraphQL */ `
  subscription OnDeleteNode(
    $owner: String
    $readers: String
    $writers: String
  ) {
    onDeleteNode(owner: $owner, readers: $readers, writers: $writers) {
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
export const onCreateEdge = /* GraphQL */ `
  subscription OnCreateEdge($owner: String) {
    onCreateEdge(owner: $owner) {
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
export const onUpdateEdge = /* GraphQL */ `
  subscription OnUpdateEdge($owner: String) {
    onUpdateEdge(owner: $owner) {
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
export const onDeleteEdge = /* GraphQL */ `
  subscription OnDeleteEdge($owner: String) {
    onDeleteEdge(owner: $owner) {
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
