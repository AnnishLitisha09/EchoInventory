import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { moderateScale } from "../../utils/scalingUtils";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import api from "../../utils/api";

export const Dashboard = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const primaryColor = "#9C6FB8";

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

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

  useEffect(() => {
    if (isFocused) fetchProducts();
  }, [isFocused]);

  // ✅ Dynamic calculations
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const totalValue = products.reduce((acc, p) => acc + (p.price || 0) * (p.stock || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: primaryColor }]}>
          <Text style={styles.greeting}>My Inventory</Text>
        </View>

        <View style={styles.overallInventoryBox}>
          <Text style={styles.overallTitle}>OVERALL INVENTORY</Text>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Total Products:</Text>
            <Text style={styles.statValue}>{totalProducts}</Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Total Stock:</Text>
            <Text style={styles.statValue}>{totalStock}</Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Total Inventory Value:</Text>
            <Text style={styles.statValue}>${totalValue}</Text>
          </View>

        </View>

        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PRODUCTS</Text>

            <TouchableOpacity onPress={() => navigation.navigate("ViewAllProductsScreen")}>
              <Text style={[styles.viewAll, { color: primaryColor }]}>View All</Text>
            </TouchableOpacity>
          </View>

          {products.slice(0, 3).map((item) => (
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
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fabButton, { backgroundColor: primaryColor }]}
        onPress={() => navigation.navigate("AddProductScreen", { mode: "add" })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F3F7" },

  header: {
    width: "100%",
    height: moderateScale(150),
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(25),
    paddingBottom: moderateScale(60),
    borderBottomLeftRadius: moderateScale(80),
    borderBottomRightRadius: moderateScale(80),
    backgroundColor: "#9C6FB8", // primary color
  },
  greeting: { color: "#fff", fontSize: moderateScale(26), fontWeight: "bold" },

  overallInventoryBox: {
    alignSelf: "center",
    marginTop: moderateScale(-60),
    width: moderateScale(320),
    backgroundColor: "#fff",
    borderRadius: moderateScale(18),
    padding: moderateScale(18),
    elevation: 6,
  },
  overallTitle: { fontSize: moderateScale(14), fontWeight: "700", marginBottom: moderateScale(10), color: "#222" },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: moderateScale(6) },
  statLabel: { fontSize: moderateScale(13), fontWeight: "600", color: "#555" },
  statValue: { fontSize: moderateScale(14), fontWeight: "700", color: "#111" },

  progressBarContainer: {
    height: moderateScale(6),
    backgroundColor: "#E8E8E8",
    borderRadius: moderateScale(4),
    marginTop: moderateScale(12),
    overflow: "hidden",
  },
  progressBar: { height: "100%", backgroundColor: "#9C6FB8" },

  sectionWrapper: { marginTop: moderateScale(50), paddingHorizontal: moderateScale(20) },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: moderateScale(15) },
  sectionTitle: { fontSize: moderateScale(18), fontWeight: "700", color: "#222" },
  viewAll: { fontSize: moderateScale(14), fontWeight: "600", color: "#9C6FB8" },

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
    backgroundColor: "#9C6FB8",
  },
  fabText: { color: "#fff", fontSize: moderateScale(30), fontWeight: "700" },
});
