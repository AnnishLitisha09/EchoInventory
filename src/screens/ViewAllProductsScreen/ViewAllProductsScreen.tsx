import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import ProductCard from "../../components/ProductCard/ProductCard";
import { moderateScale } from "../../utils/scalingUtils";
import { CurvedHeader } from "../../components/CurvedHeader/CurvedHeader";
import api from "../../utils/api";

export const ViewAllProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("none");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/products/${id}`);
              setProducts(products.filter((p) => p.id !== id));
            } catch (error) {
              console.log("Delete failed:", error);
            }
          },
        },
      ]
    );
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "All") {
      list = list.filter((p) => p.category === filter);
    }

    if (sort === "price_low") list.sort((a, b) => a.price - b.price);
    if (sort === "price_high") list.sort((a, b) => b.price - a.price);
    if (sort === "stock_low") list.sort((a, b) => a.stock - b.stock);
    if (sort === "stock_high") list.sort((a, b) => b.stock - a.stock);

    return list;
  }, [search, filter, sort, products]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CurvedHeader title="All Products" onBackPress={() => navigation.goBack()} />

      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          setFilterOpen(false);
          setSortOpen(false);
        }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topRow}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search products..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />

            <View style={{ position: "relative" }}>
              <TouchableOpacity
                style={styles.optionBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  setFilterOpen(!filterOpen);
                  setSortOpen(false);
                }}
              >
                <Text style={styles.optionText}>Filter ▾</Text>
              </TouchableOpacity>

              {filterOpen && (
                <View style={styles.dropdownLeft}>
                  {["All", "Electronics", "Office"].map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setFilter(cat);
                        setFilterOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={{ position: "relative" }}>
              <TouchableOpacity
                style={styles.optionBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  setSortOpen(!sortOpen);
                  setFilterOpen(false);
                }}
              >
                <Text style={styles.optionText}>Sort ▾</Text>
              </TouchableOpacity>

              {sortOpen && (
                <View style={styles.dropdownRight}>
                  {[
                    { key: "price_low", label: "Price: Low → High" },
                    { key: "price_high", label: "Price: High → Low" },
                    { key: "stock_low", label: "Stock: Low → High" },
                    { key: "stock_high", label: "Stock: High → Low" },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSort(option.key);
                        setSortOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <Text style={styles.statusText}>
            Filter: {filter} | Sort: {sort}
          </Text>

          {loading ? (
            <Text style={styles.loadingText}>Loading products...</Text>
          ) : filteredProducts.length === 0 ? (
            <Text style={styles.noResult}>No matching products</Text>
          ) : (
            filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                title={item.name}
                price={item.price}
                stock={item.stock}
                category={item.category}
                onEdit={() =>
                  navigation.navigate("AddProductScreen", {
                    mode: "edit",
                    product: item,
                  })
                }
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
        </ScrollView>
      </Pressable>
            <TouchableOpacity
              style={[styles.fabButton, { backgroundColor: "#9C6FB8" }]}
              onPress={() => navigation.navigate("AddProductScreen", { mode: "add" })}
            >
              <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: moderateScale(20), gap: moderateScale(10), backgroundColor: "#fff" },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchBar: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    marginRight: moderateScale(8),
    color: "#111",
  },

  optionBtn: {
    backgroundColor: "#EDE1F7",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(10),
    marginLeft: moderateScale(5),
  },

  optionText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#6A3EA1",
  },

  dropdownLeft: {
    position: "absolute",
    top: moderateScale(45),
    left: 0,
    backgroundColor: "#fff",
    minWidth: moderateScale(130),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(8),
    elevation: 6,
    zIndex: 999,
  },

  dropdownRight: {
    position: "absolute",
    top: moderateScale(45),
    right: 0,
    backgroundColor: "#fff",
    minWidth: moderateScale(150),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(8),
    elevation: 6,
    zIndex: 999,
  },

  dropdownItem: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
  },

  dropdownText: {
    fontSize: moderateScale(13),
    color: "#111",
  },

  statusText: {
    fontSize: moderateScale(12),
    color: "#333",
    marginVertical: moderateScale(8),
  },

  loadingText: {
    textAlign: "center",
    marginTop: moderateScale(20),
    fontSize: moderateScale(14),
    color: "#111",
  },

  noResult: {
    textAlign: "center",
    marginTop: moderateScale(30),
    fontSize: moderateScale(16),
    color: "#555",
  },

  fabButton: {
    position: "absolute",
    bottom: moderateScale(30),
    right: moderateScale(20),
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    elevation: 9,
  },

  fabText: {
    color: "#fff",
    fontSize: moderateScale(30),
  },
});
