
// 顶点
interface Vertex {

}
// 面
interface Face {

}

// 线
export interface Edge {
  head_vertex: Vertex
  tail_vertex: Vertex
  left_face: Face
  right_face: Face
  
  cw_left_edge: Edge
  cw_right_edge: Edge
  ccw_left_edge: Edge
  ccw_right_edge: Edge
}